import moment from 'moment'
import { get } from 'lodash/fp'
import { store } from '../config'

export const expireDate = () => {
  const status = get('userControlReducer.currentUser.status', store.getState())
  if (!status) {
    return { msg:'', n: 0 }
  }

  const created = get('created', status)
  const end = moment(created).add(process.env.REACT_APP_TRIAL_DAYS, 'days').toISOString()
  const diff = moment(end).diff(moment(), 'days')
  
  if (diff <= 0) {
    const diffHours = moment(end).diff(moment(), 'hours')
    return { 
      msg: `Will end in ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`, 
      n: diff,
    }
  } else {
    return {
      msg: `Will end in ${diff} ${diff === 1 ? 'day' : 'days'}`,
      n: diff,
    }
  }
}
