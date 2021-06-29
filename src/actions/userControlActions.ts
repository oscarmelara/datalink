import { Dispatch } from 'redux'
import { usersInfo } from '../utils'
import { IgenericObject, IcurrentUser } from '../TS'
import { GET_ALL, SET_USER, SET_USERS, SET_CURRENT_USER, SET_LOADING, SET_UPDATING_IMAGE } from '../types'
import person from '../assets/images/person.png'

export const getAll = () => (dispatch: Dispatch) => {  
  dispatch({
    type: GET_ALL,
  })
}

export const setCurrentUser = (user: IcurrentUser) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: { currentUser: user },
  })
}

export const setUsers = () => async (dispatch: Dispatch) => {
  await usersInfo().then((response) => {
    dispatch({
      type: SET_USERS,
      payload: { list: response },
    })
  }).catch(() => {
    dispatch({
      type: SET_USERS,
      payload: {
        list: [{
          value: 'all',
          label: 'All users',
          image: person,
        }] 
      },
    })
  })
}

export const setUser = (user: IgenericObject) => (dispatch: Dispatch) => {  
  dispatch({
    type: SET_LOADING,
    payload: {
      loading: true,
    },
  })
  dispatch({
    type: SET_USER,
    payload: { single: user },
  })
  dispatch({
    type: SET_LOADING,
    payload: {
      loading: false,
    },
  })
}

export const uploadingImage = (state: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_UPDATING_IMAGE,
    payload: {
      updatingImage: state,
    },
  })
}
