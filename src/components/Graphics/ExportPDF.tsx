import React from 'react'
import { useSelector } from 'react-redux'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ReportByStage } from '../Reports'
import { DownloadIcon } from '../CustomIcons'
import { IgenericObject, IReportData, IgeneralState } from '../../TS'

interface IExportExcel {
  id: number
  data: IReportData[]
  colors: IgenericObject
  title: string
}

export const ExportPDF: React.FC<IExportExcel> = ({ data, title, colors, id }) => {
  const { startDate, endDate } = useSelector(({ filtersReducer }: IgeneralState) => filtersReducer)
  if (!startDate || !endDate) {
    return <></>
  }

  return (<PDFDownloadLink
    className="cursor link-download"
    document={<ReportByStage data={data} title={title} startDate={startDate} endDate={endDate} />}
    fileName={`Report - ${title}.pdf`}>
    {({ loading, error }) => {
      if (loading) {
        return (<span style={{ color: 'black', fontWeight: 600 }}>Loading document...</span>)
      } else {
        return error ?
          (<span style={{ color: 'black', fontWeight: 600 }}>Unavailable...</span>):
          (<DownloadIcon color={colors[`stage_${id}`]} className="mx-2" />)
      }
    }}
  </PDFDownloadLink>)
}
