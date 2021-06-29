import React, { useState, useEffect } from 'react'
import { forIn } from 'lodash'
import { ThemeProvider } from 'styled-components'
import { get, isEmpty, replace } from 'lodash/fp'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { DashboardSection } from '../DashboardSection'
import { ResponsiveContainer, LineChart, Tooltip, Line, XAxis } from 'recharts'
import { OpportunityPieChart, Card, OpportunityFunnelChart, } from './'
import { IndicatorsDetails, Indicator } from './style'
import { getActiveIndicators, getIcon, getPercentage } from '../../utils'
import { IgeneralState, IgenericObjectBoolean } from '../../TS'

export const Metrics: React.FC = () => {
  const { colors, stagesData, selectedUser, previousStagesData } = useSelector(({ filtersReducer, stagesReducer, userControlReducer }: IgeneralState) => ({
    ...filtersReducer,
    ...stagesReducer,
    ...userControlReducer,
  }))
  const [selectedIndicators, setSelectedIndicators] = useState<IgenericObjectBoolean>({})
  const currentUserPreviousData = previousStagesData[selectedUser.value]
  useEffect(() => {
    if (isEmpty(selectedIndicators)) {
      getActiveIndicators().then((data) => {
        setSelectedIndicators(data)
      })
    }
  }, [selectedIndicators, currentUserPreviousData])


  // unit test
  const drawLines = (): JSX.Element[]  => {
    let LineArray: JSX.Element[] = []
    const drawLinesData = get(`[${selectedUser.value}].IndicatorsData[0]`, stagesData)
 
    forIn(drawLinesData, (value, key) => {
      if (key !== 'name') {
        if (selectedIndicators[key] === true) {
          LineArray.push(<Line key={key} type="monotone" dataKey={key} stroke={colors[key]} strokeWidth={3} />)
        }
      }
    })
    return LineArray
  }
  
  const drawDetails = (): JSX.Element[] => {
    let detailsArray: JSX.Element[] = []
    forIn(selectedIndicators, (value, key) => {
      if (value === true) {
        const stageData = get(`[${selectedUser.value}].stageCardsData[${key}]`, stagesData) || {}
        const percentage = getPercentage(get('stage_id', stageData))
        
        detailsArray.push(<ThemeProvider key={key} theme={{ main: colors[key] || 'white' }}>
          <Indicator>
            <span className={getIcon(percentage)}>{replace(/-|\+/gi, '', percentage)}</span>
            {get('stage', stageData)}
          </Indicator>
        </ThemeProvider>)
      }
    })
    return detailsArray
  }

  const updateMetrics = (name: string, value: boolean): void => {
    setSelectedIndicators({
      ...selectedIndicators,
      [name]: value,
    })
  }

  if (isEmpty(stagesData)) {
    return (<>loading...</>)
  }
  
  const cardsInfo = () => {
    return get(`[${selectedUser.value}]`, stagesData) || {}
  }
  const stageCardsDataArray = get(`[${selectedUser.value}]`, stagesData) || {}

  return (<>
    <DashboardSection
      title="Opportunity Stage Indicator"
      className="cards-dl"
      raw={true}>
      {cardsInfo().stageCardsData && (Object.keys(cardsInfo().stageCardsData).map((el, idx) => (<Card
        key={idx}
        id={el}
        updateMetrics={updateMetrics}
        selectedIndicators={selectedIndicators}
        data={cardsInfo().stageCardsData[el]}
      />)))}
    </DashboardSection>
    <Row>
      <Col xs={12} lg={6}>
        <DashboardSection title="Opportunity Stage Indicator Graph Comparison" contentClass="min-h">
          <ResponsiveContainer width="94%" height={200} className="mt-3 mb-2 mx-auto">
            <LineChart data={get('IndicatorsData', stageCardsDataArray) || []}>
              <XAxis dataKey="name" hide={true} />
              <Tooltip
                separator=""
                formatter={(value) => [value, '']}
                contentStyle={{ backgroundColor: '#191C34', opacity: 0.9, border: 'none' }} />
              {drawLines()}
            </LineChart>
          </ResponsiveContainer>
          <IndicatorsDetails>
            <p className="fz-12 fwb tc-tpurple">Selected Stages</p>
            <div>{drawDetails()}</div>
          </IndicatorsDetails>
        </DashboardSection>
      </Col>
      <Col xs={12} lg={6}>

      
      <OpportunityFunnelChart /> 
      
      </Col>
    </Row>
  </>)
}
