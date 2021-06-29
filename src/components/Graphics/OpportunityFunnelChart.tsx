import React, { useState, useEffect } from "react";
import { get, forEach } from "lodash/fp";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { FormatNumber } from "../CustomElements";
import { Tooltip, FunnelChart, Funnel, Cell } from "recharts";

import { DashboardSection } from "../DashboardSection";
import {
  IFunnel,
  IDataFunnel,
  IstageCardsData,
  IgeneralState
} from "../../TS";
import {
  PieChartsContainer,
  PieIndicator,
  IndicatorsContainer,
} from "./style";

export const OpportunityFunnelChart: React.FC = () => {
  const [dataMoney, setDataMoney] = useState<IFunnel[]>([]);
  const [dataFunnel, setDataFunnel] = useState<IDataFunnel[]>([]);
  const { selectedUser, stagesData, colors, previousStagesData } = useSelector(
    ({ userControlReducer, stagesReducer }: IgeneralState) => ({
      ...userControlReducer,
      ...stagesReducer
    })
  );

  const currentUserPreviousData = previousStagesData[selectedUser.value];

  useEffect(() => {
    const stagesDataByUser = get(`[${selectedUser.value}]`, stagesData) || {};
    const currentStageData: IstageCardsData =
      get("stageCardsData", stagesDataByUser) || {};
    const moneyData: IFunnel[] = [];
    const funnelData: IDataFunnel[] = [];
    let kha = 100;
    forEach(el => {
      moneyData.push({
        name: el.stage,
        money: el.averageRevenue,
        inStage: el.currentlyInStage,
        key: `stage_${el.stage_id}`
      });
     

      funnelData.push({
        name: el.stage,
        id: el.stage_id,
        value: kha -= 10,
        money: el.averageRevenue,
        fill: colors[`stage_${el.stage_id}`]
      });
    }, currentStageData);
    setDataMoney(moneyData);
    setDataFunnel(funnelData);
  }, [selectedUser.value, stagesData, currentUserPreviousData, colors]);

  return (
    <DashboardSection
      title="Sales Person Opportunity Ribbon"
      contentClass="min-h d-flex align-items-center"
    >
      <FunnelChart width={250} height={250}>
        <Tooltip
          itemStyle={{ color: "white" }}
          contentStyle={{
            backgroundColor: "#191C34",
            opacity: 0.9,
            border: "none"
          }}
          formatter={(value, name, index) => [
            dataFunnel.map((item, index) => <p style={{ color: item.fill, fontWeight: 'bolder' }} key={index}><FormatNumber n={item.money} /></p>)
          ]}
        />

        <Funnel dataKey="value" data={dataFunnel} id="id" isAnimationActive>
          {dataFunnel.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} stroke={entry.fill} />
          ))}
        </Funnel>
      </FunnelChart>

      <PieChartsContainer className="w-100">
        <IndicatorsContainer style={{ width: "100%" }}>
          {dataMoney.map((value, idx) => (
            <ThemeProvider
              key={idx}
              theme={{ main: colors[value.key] || "white" }}
            >
              <PieIndicator>
                <span className="value">{value.inStage}</span>
                <span className={`percentage`}>
                  <FormatNumber n={value.money} />
                </span>
                <span className="label">{value.name}</span>
              </PieIndicator>
            </ThemeProvider>
          ))}
        </IndicatorsContainer>
      </PieChartsContainer>
    </DashboardSection>
  );
};
