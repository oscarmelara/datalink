import React, { useState, useEffect } from 'react'
import { replace } from 'lodash/fp'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { ThemeProvider } from 'styled-components'
import { SendIcon } from '../CustomIcons'
import { CheckBox, FormatNumber } from '../CustomElements'
import { ModalReport } from './'
import { getReportDataById, getPercentage, getIcon } from '../../utils'
import { Actions } from '../../styles/style'
import { CardContainer } from './style'
import { ICard, IReportData, IgeneralState } from '../../TS'

export const Card: React.FC<ICard> = ({ data, id, updateMetrics, selectedIndicators }) => {
  const globalState = useSelector(({ stagesReducer, userControlReducer }: IgeneralState) => ({ ...stagesReducer, ...userControlReducer }))
  const { colors, previousStagesData, selectedUser } = globalState
  
  const [showReport, setShowReport] = useState(false)
  const [opening, setOpening] = useState(false)
  const [percentage, setPercentage] = useState('')
  const [rowData, setRowData] = useState<IReportData[]>([])

  const openReport = (id: string, end_stage: boolean) => {
    setOpening(true)
    getReportDataById(id, end_stage).then((data: IReportData[]) => {
      setOpening(false)
      setRowData(data)
      setShowReport(true)
    })
  }

  const currentUserPreviousData = previousStagesData[selectedUser.value]
  useEffect(() => {
    setPercentage(getPercentage(data.stage_id))
  }, [data, currentUserPreviousData, percentage])
  
  return (<>
    <ModalReport
      show={showReport}
      setShowReport={setShowReport}
      colors={colors}
      stage={data.stage}
      stage_id={data.stage_id}
      rowData={rowData}
      total={data.averageRevenue} />

    <ThemeProvider theme={{ main: colors[`stage_${data.stage_id}`] || 'white' }}>
      <CardContainer className="bg-blue card-dl">
        <Actions className="actions">
          <Button disabled={opening} onClick={() => openReport(id, data.end_stage)}>Report</Button>
          <CheckBox name={id} value={selectedIndicators[id]} emitChange={updateMetrics} />
        </Actions>
        <span className="h-line" />
        <div className="card-content">
          {id === 'stage_53' && <SendIcon />}
          <div>
            <p className="card-title">{data.stage}</p>
            <p className="cursor card-number" onClick={() => { if (!opening) { openReport(id, data.end_stage) } }}>
              {data.currentlyInStage}
            </p>
            <p className="card-value"><FormatNumber n={data.averageRevenue} /></p>
            <span className={getIcon(percentage)}>{replace(/-|\+/gi, '', percentage)}</span>
          </div>
        </div>
      </CardContainer>
    </ThemeProvider>
  </>)
}
