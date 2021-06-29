import axios from 'axios'
import moment from 'moment'
import { db } from './Database'
import { forEach, findIndex, get } from 'lodash/fp'
import { store } from '../config'
import { getFormatedDate, getInfusionsoftId, getUserId, getUserType, getCompanyId } from '../utils'
import { SET_LAST_UPDATE } from '../types'
import { Iusers, Icontacts, Istages, IopportunitiesTable, IopportunityRequest, IstageStates } from '../TS'


const getInfo = async () => {
      const { data } = await axios.get(`companies/${getCompanyId()}/crm/report`)
      return data
      
}

export const init = () => {
  getInfo().then((json) => {
    store.dispatch({ type: SET_LAST_UPDATE, payload: moment().toDate() })

    const generalData = [{
      key: 'instance',
      value: get('instance', json) || '',
    }, {
      key: 'lastUpdated',
      value: getFormatedDate(),
    }]
    db.generalData.bulkPut(generalData)

    // Create stages table
    const stagesArray: Istages[] = []
    forEach(({ stage_id, stage_name, stage_order, is_default, end_stage }: Istages) => {
      stagesArray.push({
        stage_id,
        stage_name,
        stage_order,
        is_default,
        end_stage,
      })
    }, get('Stages', json) || [])
    db.stages.bulkPut(stagesArray)

    // users Array
    const users: Iusers[] = []
    
    // users Array
    const contacts: Icontacts[] = []

    // Create Opportunities table
    const userIsEmpty = (user: Iusers): number => {
      if (user.id && user.first_name && user.last_name) {
        return user.id
      }
      return -1
    }
    const contactIsEmpty = (contact: Icontacts): number => {
      if (contact.id && contact.email && contact.first_name && contact.last_name) {
        return contact.id
      }
      return -1
    }

    const opportunitiesRaw: IopportunityRequest[] = get('Opportunities', json) || []
    const opportunitiesArray: IopportunitiesTable[] = []
    forEach((el) => {
      const stageStates: IstageStates[] = get('stageStates', el) || []

      forEach((stage) => {
        const userId: number = get('user.id', stage) || 0
        if (userId) {
          const idx = findIndex({ id: stage.user.id }, users)
          if (idx === -1 && userIsEmpty(stage.user as Iusers) !== -1) {
            users.push(stage.user as Iusers)
          }
        }

        const contactId: number = get('contact.id', stage) || 0
        if (contactId) {
          const idx = findIndex({ id: stage.contact.id }, contacts)
          if (idx === -1 && contactIsEmpty(stage.contact as Icontacts) !== -1) {
            contacts.push(stage.contact as Icontacts)
          }
        }

        opportunitiesArray.push({
          custom_id: `${el.id}-${stage.stage.id}`,
          id: el.id,
          last_updated: moment(stage.last_updated).isValid() ? moment(stage.last_updated).toDate() : '',
          opportunity_notes: stage.opportunity_notes,
          affiliate_id: stage.affiliate_id,
          opportunity_title: stage.opportunity_title,
          date_created: moment(stage.date_created).toDate(),
          estimated_close_date: moment(stage.estimated_close_date).isValid() ? moment(stage.estimated_close_date).toDate() : '',
          next_action_notes: stage.next_action_notes,
          next_action_date: stage.next_action_date,
          projected_revenue_low: stage.projected_revenue_low,
          include_in_forecast: stage.include_in_forecast,
          projected_revenue_high: stage.projected_revenue_high,
          stage_id: stage.stage.id,
          user_id: userIsEmpty(stage.user as Iusers),
          contact_id: contactIsEmpty(stage.contact as Icontacts),
          custom_fields: stage.custom_fields
        })
      }, stageStates)

    }, opportunitiesRaw)

    db.users.bulkPut(users)
    db.contacts.bulkPut(contacts)
    db.opportunities.bulkPut(opportunitiesArray)
  })

   

}
