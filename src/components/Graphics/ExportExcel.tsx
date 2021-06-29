import React from 'react'
import ReactExport from 'react-data-export'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AiTwotoneFileExcel } from 'react-icons/ai'
import { IReportData, IgenericObject } from '../../TS'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

interface IExportExcel {
  id: number
  data: IReportData[]
  colors: IgenericObject
  title: string
}

export const ExportExcel: React.FC<IExportExcel> = ({ data, colors, id, title }) => {
  return (<ExcelFile filename={`Report - ${title}`} element={
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 100, hide: 200 }}
        overlay={<Tooltip className="mt-1" id={`tooltip-${id}`}>Download Excel</Tooltip>}>
        <AiTwotoneFileExcel className="cursor mr-2" size={24} color={colors[`stage_${id}`]} />
      </OverlayTrigger>
    }>
    <ExcelSheet data={data} name="Report opportunities">
      <ExcelColumn label="Contact Name" value="contactName" />
      <ExcelColumn label="Contact Phone" value="contactPhone" />
      <ExcelColumn label="User Name" value="userName" />
      <ExcelColumn label="Estimated Close Date" value="estimatedCloseDate" />
      <ExcelColumn label="Opportunity Title" value="opportunityTitle" />
      <ExcelColumn label="Projected Revenue" value="projectedRevenue" />
    </ExcelSheet>
  </ExcelFile>)
}
