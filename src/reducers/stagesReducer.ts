import { SET_GLOBAL_COLORS, SET_STAGES_DATA_ALL, SET_STAGES_DATA_BY_USER, SET_FILTERS, SET_PREVIOUS_STAGES_DATA, SET_LOADING } from '../types'
import { IgenericObject, IstageCardsDataArray, IswitchesConnectWise } from '../TS'

interface IstagesReducer {
  type: string
  payload: {
    colors: IgenericObject
    stagesData: IstageCardsDataArray
    previousStagesData: IstageCardsDataArray
    filters: IswitchesConnectWise
    loading: boolean
  }
}
interface Iinitial_state {
  colors: IgenericObject
  stagesData: IstageCardsDataArray
  previousStagesData: IstageCardsDataArray
  filters: IswitchesConnectWise | null
  loading: boolean
}

// default range: Last 6 months
const INITIAL_STATE: Iinitial_state = {
  colors: {},
  stagesData: {},
  previousStagesData: {},
  filters: null,
  loading: true,
}

const stagesReducer = (state = INITIAL_STATE, action: IstagesReducer) => {
  switch (action.type) {
    case SET_GLOBAL_COLORS:
      return {
        ...state,
        colors: action.payload.colors,
      }
    case SET_STAGES_DATA_ALL:
      return {
        ...state,
        stagesData: action.payload.stagesData,
      }
    case SET_PREVIOUS_STAGES_DATA:
      return {
        ...state,
        previousStagesData: action.payload.previousStagesData,
      }
    case SET_STAGES_DATA_BY_USER:
      return {
        ...state,
        stagesData: { ...state.stagesData, ...action.payload.stagesData},
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload.filters
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    default: return state
  }
}

export default stagesReducer
