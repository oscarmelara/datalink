import React, { useEffect, useState } from "react";
import { get, isEmpty } from "lodash/fp";
import { useSelector } from "react-redux";
import { TiArrowRight } from "react-icons/ti";
import { ThemeProvider } from "styled-components";
import { Table } from "react-bootstrap";
import { Progress } from "react-sweet-progress";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportStages } from "../../components/Reports";
import { DashboardSection, FormatNumber } from "../../components";
import { IgeneralState, IgenericObjectNumbers } from "../../TS";
import { DownloadIcon } from "../../components/CustomIcons";
import {
  getAverageByContent,
  percentageFromPrevious,
  percentageTotal,
} from "../../utils";
import { Tbody, Thead, TR } from "./style";
import { Actions } from "../../styles/style";

export const OportunityStageReport: React.FC = () => {
  const [averageByProspect, setAverageByProspect] = useState<
    IgenericObjectNumbers
  >({});
  const [averageByClient, setAverageByClient] = useState<IgenericObjectNumbers>(
    {}
  );
  const [showReport, setShowReport] = useState(false);
  const { selectedUser, colors, stagesData, loading } = useSelector(
    ({ userControlReducer, stagesReducer, filtersReducer }: IgeneralState) => ({
      ...userControlReducer,
      ...stagesReducer,
      ...filtersReducer,
    })
  );

  useEffect(() => {
    setShowReport(false);
    if (!loading) {
      setAverageByProspect({});
      setAverageByClient({});
      getAverageByContent().then((data: IgenericObjectNumbers[]) => {
        setAverageByProspect(data[0]);
        setAverageByClient(data[1]);

        setTimeout(() => {
          setShowReport(true);
        }, 2000); // temp fix because of a weird bug when the data is loading
      });
    }
  }, [loading, selectedUser]);

  const data = get("stageCardsData", stagesData[selectedUser.value]) || {};
  const dataArray = Object.values(data);

  return (
    <DashboardSection
      title="Opportunity Stage Report"
      titleIcon={<TiArrowRight size={30} title="drag to see more" />}
    >
      <Actions className="actions top">
        {showReport && !isEmpty(dataArray) && (
          <PDFDownloadLink
            className="mr-2 cursor link-download"
            document={
              <ReportStages
                averageByClient={averageByClient}
                averageByProspect={averageByProspect}
              />
            }
            fileName={`Opportunity-Stage-Report.pdf`}
          >
            {({ loading, error }) => {
              if (loading) {
                return (
                  <span style={{ color: "black", fontWeight: 600 }}>
                    Loading document...
                  </span>
                );
              } else {
                return error ? (
                  <span style={{ color: "black", fontWeight: 600 }}>
                    Unavailable...
                  </span>
                ) : (
                  <>
                    <DownloadIcon className="ml-3 mr-2 mb-1" color="white" />{" "}
                    Download report
                  </>
                );
              }
            }}
          </PDFDownloadLink>
        )}

        <span className="fwsb tc-white">{selectedUser.label} data</span>
      </Actions>
      <Table className="mt-3" responsive="lg" borderless hover>
        <Thead>
          <tr>
            <th>Stage</th>
            <th>
              Currently<span>in stage</span>
            </th>
            <th>Were in stage</th>
            <th>
              Conversion<span>from previous stage</span>
            </th>
            <th>
              Total<span>that enter this stage</span>
            </th>
            <th>
              Average<span>revenue by client</span>
            </th>
            <th>
              Average<span>revenue by prospect</span>
            </th>
            <th>
              Average<span>revenue</span>
            </th>
          </tr>
        </Thead>
        <Tbody>
          {dataArray.map((el, idx) => {
            return (
              <ThemeProvider
                key={idx}
                theme={{ main: colors[`stage_${el.stage_id}`] || "white" }}
              >
                <TR>
                  <td>
                    <span className="stage-title">{el.stage}</span>
                  </td>
                  <td>
                    <span className="pill">{el.currentlyInStage}</span>
                  </td>
                  <td>
                    <span className="pill">{el.wereInStage}</span>
                  </td>
                  <td>
                    <Progress
                      style={{ width: "80%" }}
                      status="active"
                      percent={
                        el.is_default
                          ? 100
                          : percentageFromPrevious(el, idx, dataArray)
                      }
                    />
                  </td>
                  <td>
                    <Progress
                      style={{ width: "80%" }}
                      status="active"
                      percent={
                        el.is_default ? 100 : percentageTotal(el, dataArray)
                      }
                    />
                  </td>
                  <td>
                    <FormatNumber
                      n={averageByClient[`stage_${el.stage_id}`] || 0}
                    />
                  </td>
                  <td>
                    <FormatNumber
                      n={averageByProspect[`stage_${el.stage_id}`] || 0}
                    />
                  </td>
                  <td>
                    <FormatNumber n={el.averageRevenue / el.currentlyInStage} />
                  </td>
                </TR>
              </ThemeProvider>
            );
          })}
        </Tbody>
      </Table>
    </DashboardSection>
  );
};
