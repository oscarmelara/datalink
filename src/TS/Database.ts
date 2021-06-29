export interface Iusers {
  id: number
  first_name: string
  last_name: string
}

export interface Icontacts {
  id: number
  email: string
  first_name: string
  last_name: string
  company_name: string
  job_title: string
  phone_number: string
}

export interface Istages {
  stage_id: number
  stage_name: string
  stage_order: number
  is_default: boolean
  end_stage: boolean
}

export interface IopportunitiesTable {
  custom_id: string
  id: number
  last_updated: Date | string
  opportunity_notes: string | null
  affiliate_id: number
  opportunity_title: string
  date_created: Date
  estimated_close_date: Date | string
  next_action_notes: string | null
  next_action_date: string | null
  projected_revenue_low: number
  include_in_forecast: number
  projected_revenue_high: number
  stage_id: number
  user_id: number
  contact_id: number
  custom_fields: {
    id: number
    content: number | string | null
  }[]
}

export interface IstageStates {
  last_updated: string
  opportunity_notes: string
  affiliate_id: number
  opportunity_title: string
  date_created: string
  estimated_close_date: string
  next_action_notes: string
  stage: {
    id: number
  },
  next_action_date: string | null
  contact: {
    id: number
    email: string
    first_name: string
    last_name: string
    company_name: string
    job_title: string
    phone_number: string
  },
  projected_revenue_low: number
  include_in_forecast: number
  user: {
    id: number
    first_name: string
    last_name: string
  },
  projected_revenue_high: number
  custom_fields: {
    id: number
    content: number | string | null
  }[]
}

export interface IopportunityRequest {
  _id: string
  id: number
  stageStates: IstageStates[]
}

export interface IgeneralData {
  key: string
  value: string
}

export interface Iopportunities {
  id: number
  last_updated: string
  opportunity_notes: string | null
  affiliate_id: number
  opportunity_title: string
  date_created: string
  estimated_close_date: string
  next_action_notes: string
  next_action_date: string
  projected_revenue_low: number
  include_in_forecast: number
  projected_revenue_high: number
  stage: {
    id: number,
  },
  user: Iusers
  contact: Icontacts
  user_id: number
  contact_id: number
}
