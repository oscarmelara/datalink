import moment from 'moment'
import { SET_START_DATE, SET_END_DATE, SET_LAST_UPDATE  } from '../types'

interface IfiltersReducer {
  type: string
  payload: Date
}
interface Iinitial_state {
  startDate: Date | null,
  endDate: Date | null,
  lastUpdate: Date | null,
}

// default range: Last month
const INITIAL_STATE: Iinitial_state = {
  startDate: moment().startOf('month').startOf('day').toDate(),
  endDate: moment().endOf('month').toDate(),
  lastUpdate: null,
}

const filtersReducer = (state = INITIAL_STATE, action: IfiltersReducer) => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      }
    case SET_LAST_UPDATE:
      return {
        ...state,
        lastUpdate: action.payload,
      }
    default: return state
  }
}

export default filtersReducer
