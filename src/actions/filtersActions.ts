import { Dispatch } from 'redux'
import { SET_START_DATE, SET_END_DATE } from '../types'

export const setStartDate = (payload: Date | null) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_START_DATE,
    payload,
  })
}

export const setEndDate = (payload: Date | null) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_END_DATE,
    payload,
  })
}

