import moment from "moment";
import { round } from "lodash";
import { forEach, findIndex, toNumber, orderBy, filter, get } from "lodash/fp";
import {
  Istages,
  IopportunitiesTable,
  IgenericObjectBoolean,
  IgenericObject,
} from "../TS";
import { db } from "./Database";
import { blend_colors } from "./colorBlend";

export const makeStageCardsData = (
  card: Istages,
  currentlyInStage: number,
  averageRevenue: number,
  wereInStage: number,
  spider: any
) => {
  return {
    stage_id: card.stage_id,
    stage: card.stage_name,
    currentlyInStage,
    wereInStage,
    averageRevenue,
    icon: "more-ico",
    is_default: card.is_default,
    end_stage: card.end_stage,
    order: card.stage_order,
    spider,
  };
};

export const makeIndicatorsData = (
  stageData: IopportunitiesTable[],
  id: number
) => {
  let dato = localStorage.getItem("mes_seleccionado");

  if (dato === "today") {
    const limitDate = moment().subtract(0, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(1, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else if (dato === "lmonth") {
    const limitDate = moment().subtract(0, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(1, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else if (dato === "nmonth") {
    const limitDate = moment().subtract(2, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(1, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else if (dato === "l3month") {
    const limitDate = moment().subtract(3, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(3, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else if (dato === "n3month") {
    const limitDate = moment().subtract(1, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(0, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else if (dato === "lyear") {
    const limitDate = moment().subtract(11, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(11, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  } else {
    localStorage.setItem("mes_seleccionado", "kha");
    const limitDate = moment().subtract(3, "months").startOf("month");
    // because when using object limitDate sometimes it saved the value after increasing 1 month
    const initial = moment().subtract(3, "months").startOf("month");
    // let amount = 0

    const processedStage = [
      { name: initial.format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
      { name: initial.add(1, "month").format("MMMM"), [`stage_${id}`]: 0 },
    ];

    forEach((el: IopportunitiesTable) => {
      const rowDate = moment(el.estimated_close_date);
      if (rowDate.isSameOrAfter(limitDate)) {
        const idx = findIndex({ name: rowDate.format("MMMM") }, processedStage);
        const accumulator =
          toNumber(processedStage[idx][`stage_${id}`]) +
          el.projected_revenue_high;
        processedStage[idx][`stage_${id}`] = round(accumulator, 2);
      }
    }, stageData);

    return processedStage;
  }
};

export const getActiveIndicators = async () => {
  // Selectable stages to display
  const activeIndicators: IgenericObjectBoolean = {};
  const stages = await db.stages.toCollection().sortBy("stage_order");
  forEach((el) => {
    activeIndicators[`stage_${el.stage_id}`] = true;
  }, stages);

  return activeIndicators;
};

export const DashboardColors = async () => {
  const stages = (await db.stages.toCollection().sortBy("stage_order")) || [];
  const ends: Istages[] = orderBy(
    "stage_order",
    "desc",
    filter({ end_stage: true }, stages)
  );
  const badEnd: Istages = get("[0]", ends) || {};
  const goodEnd: Istages = get("[1]", ends) || {};

  const newOpp = "#007AFF";
  const closedConverted = "#E17740";
  const lost = "#E63E60";

  const colors: IgenericObject = {};
  const n = 1 / (stages.length - 3); // 3 bacause of new opp, closed and lost

  stages.forEach((el, idx) => {
    if (el.is_default) {
      colors[`stage_${el.stage_id}`] = newOpp;
    } else if (el.stage_id === goodEnd.stage_id) {
      colors[`stage_${el.stage_id}`] = closedConverted;
    } else if (el.stage_id === badEnd.stage_id) {
      colors[`stage_${el.stage_id}`] = lost;
    } else {
      colors[`stage_${el.stage_id}`] = blend_colors(
        "#32C4AB",
        "#D8A530",
        idx * n
      );
    }
  });
  return colors;
};
