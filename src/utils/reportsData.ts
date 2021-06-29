import moment from 'moment'
import { toNumber, replace, get, map } from 'lodash/fp'
import { store } from '../config'
import { IReportData } from '../TS'
import { db } from './Database'

export const getInfusionSoftInstance = () => {
  return db.generalData.where('key').equals('instance').toArray()
}
export const getLastUpdate = async () => {
  const response = await db.generalData.where('key').equals('lastUpdated').toArray()

  const prevDate: string = get('[0].value', response) || ''
  return prevDate || moment().format()
}

export const getReportDataById = async (id: string, end_stage: boolean) => {
  const state = store.getState()
  const stageId = toNumber(replace('stage_', '', id) || 0)
  const user: string = get('userControlReducer.selectedUser.value', state) || 'empty'
  const userId = toNumber(replace('user_', '', user) || 0)
  const startDate = get('filtersReducer.startDate', state) || moment().subtract(6, 'months').startOf('day').toDate()
  const endDate = get('filtersReducer.endDate', state) || moment().endOf('month').toDate()
  let dateSelection = localStorage.getItem("mes_seleccionado");
  let opportunities = null

  if( dateSelection === 'kha' ) {
    opportunities = await db
    .opportunities
    .where('last_updated')
    .between(startDate, endDate)
    .and((row) => (row.stage_id === stageId))
    .and((row) => {
      if (user === 'all') {
        return true
      }
      return row.user_id === userId
    })
    .with({ users: 'user_id', contacts: 'contact_id' })
  } else if(dateSelection === 'today') {
    opportunities = await db
    .opportunities
    .where('last_updated')
    .between(startDate, endDate)
    .and((row) => (row.stage_id === stageId))
    .and((row) => {
      if (user === 'all') {
        return true
      }
      return row.user_id === userId
    })
    .with({ users: 'user_id', contacts: 'contact_id' })
  } else {
    opportunities = await db
    .opportunities
    .where('estimated_close_date')
    .between(startDate, endDate)
    .and((row) => (row.stage_id === stageId))
    .and((row) => {
      if (user === 'all') {
        return true
      }
      return row.user_id === userId
    })
    .with({ users: 'user_id', contacts: 'contact_id' })
  }
  
  
  // opp -> Opportunity
  const response: IReportData[] = map((opp) => {
    const contactRow = get('contacts', opp)
    const userRow = get('users', opp)
    const estimatedCloseDate = opp.estimated_close_date ? moment(opp.estimated_close_date).format('MM/DD/YYYY') : ''
    const last = opp.last_updated ? moment(opp.last_updated).format('MM/DD/YYYY') : ''
    return {
      id: opp.id,
      contactName: `${get('first_name', contactRow) || ''} ${get('last_name', contactRow) || ''}`,
      contactPhone: get('phone_number', contactRow) || '',
      userName: `${get('first_name', userRow) || ''} ${get('last_name', userRow) || ''}`,
      estimatedCloseDate,
      opportunityTitle: opp.opportunity_title,
      projectedRevenue: `$${opp.projected_revenue_high}`,
      spider: end_stage,
      lastUpdate: last

    }
  }, opportunities)
  return response
}

