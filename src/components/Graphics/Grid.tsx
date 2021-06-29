import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { GridApi } from "ag-grid-community/dist/lib/gridApi";
import { IReportData, IopportunityTitleCellParams } from "../../TS";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


export const Grid: React.FC<{ data: IReportData[]; instance: string }> = ({
  data,
  instance,
}) => {

  const defaultColDef = {
    sortable: true,
    resizable: true,
    cellStyle: {
      "font-size": "13px",
      color: "#717171",
      "font-weight": 400,
      "font-family": "Open Sans",
    },
  };

  //Custom Cell
  let cellTittle = (params: IopportunityTitleCellParams) => {
    const url = `https://${instance}/Opportunity/manageOpportunity.jsp?view=edit&ID=${params.data.id}`;
    return `<a href="${url}" target="_blank">${params.value}</a>`;
  };

  let dateClosed = (params: IopportunityTitleCellParams) => {
    return params.data.spider
      ? params.data.lastUpdate
      : params.data.estimatedCloseDate;
  };

  const onGridReady = (params: { type: string; api: GridApi }) => {
    if (window.innerWidth > 1000) {
      params.api.sizeColumnsToFit();
    }
  };
  return (
    <AgGridReact
      defaultColDef={defaultColDef}
      // columnDefs={columnDefs}
      rowData={data}
      onGridReady={onGridReady}
    >
      <AgGridColumn
        headerName="Contact Name"
        field="contactName"
      ></AgGridColumn>
      <AgGridColumn
        headerName="Contact Phone"
        field="contactPhone"
      ></AgGridColumn>
      <AgGridColumn headerName="User Name" field="userName"></AgGridColumn>

      <AgGridColumn
        headerName=" Estimated Close Date"
        cellRenderer={dateClosed}
      ></AgGridColumn>

      <AgGridColumn
        headerName="Opportunity Title"
        field="opportunityTitle"
        cellRenderer={cellTittle}
      ></AgGridColumn>
      <AgGridColumn
        headerName="Projected Revenue"
        field="projectedRevenue"
      ></AgGridColumn>
    </AgGridReact>
  );
};
