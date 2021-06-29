import React, { useState, useEffect } from 'react'
import { toString, includes, isEmpty, filter, get } from 'lodash/fp'
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FiSearch, FiX } from 'react-icons/fi'
import { getInfusionSoftInstance } from '../../utils'
import { FormatNumber } from '../CustomElements'
import { Grid, ExportExcel, ExportPDF } from './'
import { Form } from './style'
import { IModalReport, IReportData } from '../../TS'

export const ModalReport: React.FC<IModalReport> = ({ show, stage, stage_id, colors, setShowReport, rowData = [], total }) => {
  const [filterInput, setFilterInput] = useState('')
  const [infusionSoftInstance, setInfusionSoftInstance] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [resultFilteredData, setResultFilteredData] = useState<IReportData[]>([])
  useEffect(() => {
    getInfusionSoftInstance().then((data) => setInfusionSoftInstance(get('[0].value', data)))
  }, [stage_id])

  const filterData = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (filterInput !== '') {
      setFiltering(true)
      const result = filter((el) => {
        const stringToSearch = toString(Object.values(el)).toLocaleLowerCase()
        return includes(filterInput.toLowerCase(), stringToSearch)
      }, rowData)

      if (isEmpty(result)) { setResultFilteredData([]) }
      else { setResultFilteredData(result) }
    } else {
      setFiltering(false)
    }
  }
  const resetFilterData = () => {
    setFiltering(false)
    setFilterInput('')
  }
  
  return (<Modal centered show={show} onHide={() => setShowReport(false)} className="report-modal">
    <Modal.Header className="header-modal-report" closeButton>
      <h3 className="head-report" style={{ color: colors[`stage_${stage_id}`] }}>{stage}</h3>
      <Form onSubmit={filterData}>
        {!isEmpty(rowData) && (<>
          <ExportExcel title={stage} id={stage_id} colors={colors} data={filtering ? resultFilteredData : rowData} />
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 100, hide: 200 }}
            overlay={<Tooltip className="mt-1" id={`tooltip-${stage_id}`}>Download PDF</Tooltip>}>
            <span>
              <ExportPDF id={stage_id} colors={colors} title={stage} data={filtering ? resultFilteredData : rowData} />
            </span>
          </OverlayTrigger>
        </>)}
        <div>
          {filtering && (<FiX color="#717171" className="close-filtering cursor" onClick={resetFilterData} />)}
          <input
            value={filterInput}
            type="text"
            placeholder="Search"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setFilterInput(ev.currentTarget.value)} />
        </div>
        <button><FiSearch color="white" className="cursor" /></button>
      </Form>
    </Modal.Header>
    <Modal.Body>
      <div className="ag-theme-material" style={{ height: '450px', width: '100%' }}>
        <Grid data={filtering ? resultFilteredData : rowData} instance={infusionSoftInstance} />
      </div>
      <div className="w-100 fwb text-right pr-5 pt-3" style={{ color: colors[`stage_${stage_id}`] }}>
        Total: <FormatNumber n={total} />
      </div>
    </Modal.Body>
  </Modal>)
}
