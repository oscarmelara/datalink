import moment from "moment";
import {
  forEach,
  filter,
  sumBy,
  merge,
  get,
  isEmpty,
  round,
  includes,
  reverse,
  replace,
  toNumber,
  find,
  lowerCase,
  keys,
  toString,
} from "lodash/fp";
import { db } from "./Database";
import { store } from "../config";
import { inverseObj } from "../utils";
import { makeStageCardsData, makeIndicatorsData } from "./DashboardData";
import {
  IgenericObject,
  IUserInfo,
  IopportunitiesTable,
  IstageCardsData,
  IstageCardsDataArray,
  IStageStructure,
  IgenericObjectNumbers,
  Iselected,
} from "../TS";
import person from "../assets/images/person.png";

export const usersInfo = async () => {
  const users = await db.users.toArray();
  const processedUsers: IUserInfo[] = [
    {
      value: "all",
      label: "All users",
      image: person,
    },
  ];

  forEach((el) => {
    processedUsers.push({
      value: `user_${el.id}`,
      label: `${el.first_name} ${el.last_name}`,
      image: person,
    });
  }, users);
  return processedUsers;
};

export const getStageCardsData = async (
  start: Date | null = null,
  end: Date | null = null
) => {
  let stageCardsData: IstageCardsData = {};
  let IndicatorsData: IgenericObject[] = [];
  let wereInStage: number = 0;
  
  const stages = reverse(await db.stages.toCollection().sortBy("stage_order"));


  // default range if variebles are null: Last month
  const defaultStart =
    start || moment().subtract(1, "months").startOf("day").toDate();
  const defaultEnd = end || moment().endOf("day").toDate();
  let dateSelection = localStorage.getItem("mes_seleccionado");
  let opportunities: IopportunitiesTable[];
  // opportunities = await db.opportunities.where('estimated_close_date').between(defaultStart, defaultEnd).toArray()
  for (const el of stages) {
    if (el.end_stage) {
      opportunities = await db.opportunities
        .where("last_updated")
        .between(defaultStart, defaultEnd)
        .toArray();
    } else {
      if(dateSelection === 'kha') {
        opportunities = await db.opportunities
        .where("last_updated")
        .between(defaultStart, defaultEnd)
        .toArray();
      } else if(dateSelection === 'today') {
        opportunities = await db.opportunities
        .where("last_updated")
        .between(defaultStart, defaultEnd)
        .toArray();
      } else {
         opportunities = await db.opportunities
        .where("estimated_close_date")
        .between(defaultStart, defaultEnd)
        .toArray();
      }
      
    }
    const opportunitiesList = filter({ stage_id: el.stage_id }, opportunities);
    const averageRevenue =
      sumBy("projected_revenue_high", opportunitiesList) || 0;
    wereInStage += opportunitiesList.length;
    // Stage cards info

    

    stageCardsData[`stage_${el.stage_id}`] = makeStageCardsData(
      el,
      opportunitiesList.length,
      averageRevenue,
      el.end_stage ? opportunitiesList.length : wereInStage,
      el.end_stage
    );
 
    // Line chart
    IndicatorsData = Object.values(
      merge(IndicatorsData, makeIndicatorsData(opportunitiesList, el.stage_id))
    );
  }

  stageCardsData = inverseObj(stageCardsData) as IstageCardsData;

  return {
    stageCardsData,
    IndicatorsData,
  };
};

export const getDataByUser = async (
  start: Date | null = null,
  end: Date | null = null
) => {
  let IndicatorsData: IgenericObject[] = [];
  const stageCardsDataByUser: IstageCardsDataArray = {};
  let opportunities: IopportunitiesTable[] = [];
  
  const defaultStart =
    start || moment().subtract(1, "months").startOf("day").toDate();
  const defaultEnd = end || moment().endOf("day").toDate();
  const stages = reverse(await db.stages.toCollection().sortBy("stage_order"));
  const users = await db.users.toArray();
  let dateSelection = localStorage.getItem("mes_seleccionado");

  for (const user of users) {
    let stageCardsData: IstageCardsData = {};
    let wereInStage: number = 0;

    for (const stage of stages) {
      if (stage.end_stage) {
        
        opportunities = await db.opportunities
          .where("last_updated")
          .between(defaultStart, defaultEnd)
          .toArray();
      } else {
        if(dateSelection === 'kha') {
          opportunities = await db.opportunities
          .where("last_updated")
          .between(defaultStart, defaultEnd)
          .toArray();
        } else if(dateSelection === 'today') {
          opportunities = await db.opportunities
          .where("last_updated")
          .between(defaultStart, defaultEnd)
          .toArray();
        } else {
           opportunities = await db.opportunities
          .where("estimated_close_date")
          .between(defaultStart, defaultEnd)
          .toArray();
        }
      }
      const opportunitiesByUser = filter(
        { stage_id: stage.stage_id, user_id: user.id },
        opportunities
      );
      const averageRevenue =
        sumBy("projected_revenue_high", opportunitiesByUser) || 0;
      wereInStage += opportunitiesByUser.length;

      // Stage cards info
      

      stageCardsData[`stage_${stage.stage_id}`] = makeStageCardsData(
        stage,
        opportunitiesByUser.length,
        averageRevenue,
        stage.end_stage ? opportunitiesByUser.length : wereInStage,
        stage.end_stage
      );

      // Line chart
      IndicatorsData = Object.values(
        merge(
          IndicatorsData,
          makeIndicatorsData(opportunitiesByUser, stage.stage_id)
        )
      );
    }
    stageCardsData = inverseObj(stageCardsData) as IstageCardsData;

    stageCardsDataByUser[`user_${user.id}`] = {
      stageCardsData: { ...stageCardsData },
      IndicatorsData: [...IndicatorsData],
    };
  }

  return stageCardsDataByUser;
};

export const getPercentage = (stage_id: number): string => {
  const state = store.getState();
  const selectedUser: string = get(
    "userControlReducer.selectedUser.value",
    state
  );
  const currentData: IStageStructure = get(
    `stagesReducer.stagesData[${selectedUser}].stageCardsData['stage_${stage_id}']`,
    state
  );
  const previousData: IStageStructure = get(
    `stagesReducer.previousStagesData[${selectedUser}].stageCardsData['stage_${stage_id}']`,
    state
  );

  if (isEmpty(previousData)) {
    return "___";
  }
  const prevMount = previousData.currentlyInStage;
  const currMount = currentData.currentlyInStage;

  if (prevMount <= 0 && currMount > 0) {
    // positive
    return "+100%";
  } else if (prevMount <= 0 && currMount <= 0) {
    // middle
    return "0%";
  } else if (prevMount > 0 && currMount <= 0) {
    // negative
    return "-100%";
  }
  const percentage = round((currMount / prevMount) * 100);
  const final = 100 - percentage;

  if (final === 0) {
    return "0%";
  } else if (final < 0) {
    return `+${final * -1}%`; // to remove the negative sign
  } else {
    return `-${final}%`;
  }
};

export const getIcon = (percentage: string): string => {
  if (includes("-", percentage)) {
    return "less-ico";
  } else if (includes("+", percentage)) {
    return "more-ico";
  }
  return "";
};

const searchInCustomFields = (search: string, el: IopportunitiesTable) => {
  return find((cf) => {
    const content = cf.content;
    return includes(search, lowerCase(toString(content)));
  }, el.custom_fields);
};

export const getAverageByContent = () => {
  const state = store.getState();
  const selectedUser: string = get(
    "userControlReducer.selectedUser.value",
    state
  );
  const start: Date = get("filtersReducer.startDate", state);
  const end: Date = get("filtersReducer.endDate", state);
  return db.opportunities
    .where("estimated_close_date")
    .between(start, end)
    .and((row) => {
      if (selectedUser !== "all") {
        return row.user_id === toNumber(replace("user_", "", selectedUser));
      }
      return true;
    })
    .toArray()
    .then((opportunities) => {
      const resultProspect: IgenericObjectNumbers = {};
      const countProspects: IgenericObjectNumbers = {};

      const resultClient: IgenericObjectNumbers = {};
      const countClients: IgenericObjectNumbers = {};

      forEach((el) => {
        const hasProspect = searchInCustomFields("prospect", el);
        const hasClient = searchInCustomFields("client", el);
        if (!isEmpty(hasProspect)) {
          resultProspect[`stage_${el.stage_id}`] =
            (resultProspect[`stage_${el.stage_id}`] || 0) +
            el.projected_revenue_high;
          countProspects[`stage_${el.stage_id}`] =
            (countProspects[`stage_${el.stage_id}`] || 0) + 1;
        }

        if (!isEmpty(hasClient)) {
          resultClient[`stage_${el.stage_id}`] =
            (resultClient[`stage_${el.stage_id}`] || 0) +
            el.projected_revenue_high;
          countClients[`stage_${el.stage_id}`] =
            (countClients[`stage_${el.stage_id}`] || 0) + 1;
        }
      }, opportunities);

      keys(countProspects).forEach((el) => {
        resultProspect[el] = resultProspect[el] / countProspects[el];
      });
      keys(countClients).forEach((el) => {
        resultClient[el] = resultClient[el] / countClients[el];
      });

      return [resultProspect, resultClient];
    });
};
