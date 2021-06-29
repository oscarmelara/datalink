import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { forEach, get, replace } from 'lodash/fp'
import { useSelector } from 'react-redux'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { DashboardSection } from '../DashboardSection'
import { getPercentage, getIcon } from '../../utils'
import { IgeneralState, IPieData, IstageCardsData } from '../../TS'
import { PieChartsContainer, PieIndicator, IndicatorsContainer, ChartContainerPie } from './style'

export const OpportunityPieChart: React.FC = () => {
  const [pieData, setPieData] = useState<IPieData[]>([])
  const [pieDataMainValue, setPieDataMainValue] = useState(0)
  const { selectedUser, stagesData, colors, previousStagesData } = useSelector(({ userControlReducer, stagesReducer }: IgeneralState) => ({
    ...userControlReducer,
    ...stagesReducer,
  }))

  const currentUserPreviousData = previousStagesData[selectedUser.value]
  useEffect(() => {
    const stagesDataByUser = get(`[${selectedUser.value}]`, stagesData) || {}
    const currentStageData: IstageCardsData = get('stageCardsData', stagesDataByUser) || {}
    const pieDataPiece: IPieData[] = []
    forEach((el) => {
      if(el.is_default) {
        setPieDataMainValue(el.currentlyInStage)
      }
      const percentage = getPercentage(el.stage_id)
      pieDataPiece.push({
        name: el.stage,
        value: el.currentlyInStage,
        key: `stage_${el.stage_id}`,
        percentage: percentage,
      })
    }, currentStageData)
    setPieData(pieDataPiece)
  }, [selectedUser.value, stagesData, currentUserPreviousData])

  

  return (<DashboardSection title="Sales Person Opportunity Ribbon" contentClass="min-h d-flex align-items-center">
    <PieChartsContainer className="w-100">
      <ChartContainerPie>
        <span className="pieTitle">{pieDataMainValue}</span>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip
              separator=": "
              itemStyle={{ color: 'white' }}
              contentStyle={{ backgroundColor: '#191C34', opacity: 0.9, border: 'none' }} />
            <Pie dataKey="value" data={pieData} fill="#8884d8" innerRadius={35}>{
              pieData.map((entry, idx) => <Cell key={idx} fill={colors[entry.key]} stroke={colors[entry.key]} />)
            }</Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainerPie>
      <IndicatorsContainer>
        {pieData.map((value, idx) => (<ThemeProvider key={idx} theme={{ main: colors[value.key] || 'white' }}>
          <PieIndicator>
            <span className="value">{value.value}</span>
            <span className={`percentage ${getIcon(value.percentage)}`}>
              {replace(/-|\+/gi, '', value.percentage)}
            </span>
            <span className="label">{value.name}</span>
          </PieIndicator>
        </ThemeProvider>))}
      </IndicatorsContainer>
    </PieChartsContainer>
  </DashboardSection>)
}
