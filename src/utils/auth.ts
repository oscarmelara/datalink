import axios from 'axios'
import { get } from 'lodash/fp'
import { IcurrentUser } from '../TS'
import { SET_CURRENT_USER } from '../types'
import { store } from '../config'
import { db } from './Database'

const publicRoutes = ['/', '/sign-up', '/reset-password']

export const logout = (): void => {
  localStorage.clear()
  sessionStorage.clear()
  db.delete()
  window.location.href = '/'
}

export const getUserId = (): string => {
  return sessionStorage.getItem('userId') || localStorage.getItem('userId') || ''
}

export const getCompanyId = (): string => {
  return sessionStorage.getItem('companyId') || localStorage.getItem('companyId') || ''
}


export const getInfusionsoftId = (): string => {
  return sessionStorage.getItem('infusionSoft') || localStorage.getItem('infusionSoft') || ''
}
export const getUserType = (): string => {
  return sessionStorage.getItem('principalType') || localStorage.getItem('principalType') || ''
}

export const getManagerName = (): string => {
  return sessionStorage.getItem('companyManager') || localStorage.getItem('companyManager') || ''
}
export const getManagerImage = (): string => {
  return sessionStorage.getItem('companyManagerImage') || localStorage.getItem('companyManagerImage') || ''
}
export const getUserConnectWise = (): string => {
  return sessionStorage.getItem('connectWise') || localStorage.getItem('connectWise') || ''
}

export const setAxiosConfig = (): void => {
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId')
  const at = sessionStorage.getItem('AT') || localStorage.getItem('AT')

  axios.defaults.baseURL = process.env.REACT_APP_API
  axios.defaults.params = { access_token: at || '' }
  
  if (!publicRoutes.includes(window.location.pathname) && !window.location.pathname.includes('new-password') && !window.location.pathname.includes('welcome')) {
    const type = getUserType() === 'company' ? 'companies' : 'customers'
    axios
      .get(`${type}/${id || 'not-user'}`)
      .then(({ data }: { data: IcurrentUser }) => {
        store.dispatch({ type: SET_CURRENT_USER, payload: { currentUser: data } })
      })
      .catch((e) => { return e  })
  }
}

export const token = (): boolean => {
  if (localStorage.getItem('AT') || sessionStorage.getItem('AT')) {
    return true
  }
  return false
}

export const getCurrentUser = (): IcurrentUser => {
  const state = store.getState()
  return get('userControlReducer.currentUser', state) || {}
}
