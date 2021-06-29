import axios from "axios";
import moment from "moment";
import { get, set, merge } from "lodash/fp";
import { Dispatch } from "redux";
import { DashboardColors, getStageCardsData, getDataByUser } from "../utils";
import {
  SET_GLOBAL_COLORS,
  SET_STAGES_DATA_ALL,
  SET_STAGES_DATA_BY_USER,
  SET_FILTERS,
  SET_PREVIOUS_STAGES_DATA,
  SET_LOADING,
} from "../types";
import {
  IcurrentUser,
  IswitchesConnectWise,
  IstageCardsDataArray,
} from "../TS";
import { store } from "../config";

export const setGlobalColors = () => async (dispatch: Dispatch) => {
  await DashboardColors()
    .then((response) => {
      dispatch({
        type: SET_GLOBAL_COLORS,
        payload: {
          colors: response,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: SET_GLOBAL_COLORS,
        payload: {
          colors: { color: "empty list" },
        },
      });
    });
};

export const setStageData = (
  start: Date | null = null,
  end: Date | null = null
) => async (dispatch: Dispatch) => {
  await getStageCardsData(start, end)
    .then((response) => {
      dispatch({
        type: SET_STAGES_DATA_ALL,
        payload: {
          stagesData: {
            all: {
              stageCardsData: response.stageCardsData,
              IndicatorsData: response.IndicatorsData,
            },
          },
        },
      });
    })
    .catch(() => {
      dispatch({
        type: SET_STAGES_DATA_ALL,
        payload: {
          stagesData: {
            all: {
              stageCardsData: {},
              IndicatorsData: {},
            },
          },
        },
      });
    });
};

export const setStageDataByUser = (
  start: Date | null = null,
  end: Date | null = null
) => (dispatch: Dispatch) => {
  getDataByUser(start, end)
    .then((response) => {
      dispatch({
        type: SET_STAGES_DATA_BY_USER,
        payload: {
          stagesData: response,
        },
      });
      dispatch({
        type: SET_LOADING,
        payload: {
          loading: false,
        },
      });
    })
    .catch(() => {});
};

const addStaticSwitches = (
  data: IswitchesConnectWise
): IswitchesConnectWise => {
  let filters = data;
  const currentUser: IcurrentUser =
    get("userControlReducer.currentUser", store.getState()) || {};

  const companyMarkets = [
    {
      id: -1,
      name: "Companies without Markets",
      info: true,
    },
    ...(get("ApiResponse.companyMarkets", data) || []),
  ];
  const syncAllUsers = [
    {
      id: 0,
      name: "Sync all contacts",
      danger: true,
    },
  ];
  const companyClassification = [
    {
      id: -2,
      name: "Accounts Without Classification",
      info: true,
    },
    ...(get("ApiResponse.companyClasifications", data) || []),
  ];
  const contactsCustomers = [
    {
      id: -3,
      name: "Contacts Without Type",
      info: true,
    },
    ...(get("ApiResponse.contactTypes", data) || []),
  ];
  const accountsTerritories = [
    {
      id: -4,
      name: "Accounts Without Territories",
      info: true,
    },
    ...(get("ApiResponse.companyTerritories", data) || []),
  ];
  

  const companyTypes = [
    {
      id: -5,
      name: "Companies Without Types",
      info: true,
    },
    ...(get("ApiResponse.companyTypes", data) || []),
  ];

  filters = set("ApiResponse.companyMarkets", companyMarkets, filters);
  filters = set("ApiResponse.contactTypes", contactsCustomers, filters);  
  filters = set("ApiResponse.companyTerritories", accountsTerritories, filters);
  filters = set("ApiResponse.companyTypes", companyTypes, filters);
  
  if (currentUser.connectWise) {
    filters = set("ApiResponse.Synccontacts", syncAllUsers, filters);
  }
  filters = set(
    "ApiResponse.companyClasifications",
    companyClassification,
    filters
  );
  
  if (currentUser.dattoAutotask) {
    
    
  }


  return filters;
};

export const getSwitches = () => (dispatch: Dispatch) => {
  const currentUser: IcurrentUser =
    get("userControlReducer.currentUser", store.getState()) || {};

  if (currentUser.PSA) {
    // await axios.get(`connectWise/${currentUser.connectWise}/version`) // manual fix
    axios
      .get(`companies/${currentUser.id}/psa/filters`) //GET /companies/{id}/psa/filters
      .then(({ data }: { data: IswitchesConnectWise }) => {
        let filters = addStaticSwitches(data);
        dispatch({
          type: SET_FILTERS,
          payload: { filters },
        });
      })
      .catch(() => {});
  }
};

export const setSwitches = (data: IswitchesConnectWise) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_FILTERS,
    payload: { filters: addStaticSwitches(data) },
  });
};

export const setPreviousData = (
  start: Date | null = null,
  end: Date | null = null
) => (dispatch: Dispatch) => {
  if (start && end) {
    const startDate = moment(start);
    const endDate = moment(end);
    const diffMonths = endDate.diff(startDate, "month");
    const diff = endDate.diff(startDate, "days");

    let newStart = moment(start).subtract(diff, "days");
    let newEnd = moment(start).subtract(1, "day");
    let previousData: IstageCardsDataArray = {};

    if (diffMonths <= 0 && startDate.format("MM") === endDate.format("MM")) {
      newStart = moment(start).subtract(1, "month");
      newEnd = moment(newStart).add(diff, "days");
    }

    getStageCardsData(newStart.toDate(), newEnd.toDate())
      .then((response) => {
        previousData = set("all", response, previousData);
      })
      .then(() => {
        return getDataByUser(newStart.toDate(), newEnd.toDate()).then(
          (response) => {
            previousData = merge(previousData, response);
          }
        );
      })
      .then(() => {
        dispatch({
          type: SET_PREVIOUS_STAGES_DATA,
          payload: { previousStagesData: previousData },
        });
      })
      .catch(() => {});
  }
};

export const setLoading = (state: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: {
      loading: state,
    },
  });
};
