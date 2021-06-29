import { combineReducers } from 'redux'
import userControlReducer from './userControlReducer'
import filtersReducer from './filtersReducer'
import stagesReducer from './stagesReducer'

export default combineReducers({
  userControlReducer,
  filtersReducer,
  stagesReducer,
})

