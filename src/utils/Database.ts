import Dexie from 'dexie'
import relationships from 'dexie-relationships'
import { Iusers, Icontacts, Istages, IopportunitiesTable, IgeneralData } from '../TS'

const DB_VERSION = 2

class DatalinkDB extends Dexie {
  stages: Dexie.Table<Istages, number>
  users: Dexie.Table<Iusers, number>
  contacts: Dexie.Table<Icontacts, number>
  opportunities: Dexie.Table<IopportunitiesTable, string>
  generalData: Dexie.Table<IgeneralData, string>

  constructor() {
    super('DatalinkDB', { addons: [relationships] }) // Database name
    this.version(DB_VERSION).stores({
      generalData: 'key,value',
      stages: 'stage_id,stage_name',
      users: 'id,first_name,last_name',
      contacts: 'id,email,first_name,last_name,company_name,job_title,phone_number',
      opportunities: `custom_id,
        id,
        last_updated,
        opportunity_notes,
        affiliate_id,
        opportunity_title,
        date_created,
        estimated_close_date,
        next_action_notes,
        next_action_date,
        projected_revenue_low,
        include_in_forecast,
        projected_revenue_high,
        stage_id -> stages.stage_id,
        user_id -> users.id,
        contact_id -> contacts.id`
    })
    this.stages = this.table('stages')
    this.users = this.table('users')
    this.contacts = this.table('contacts')
    this.opportunities = this.table('opportunities')
    this.generalData = this.table('generalData')
  }
}

export const db = new DatalinkDB()
