import React from 'react'

export interface IgenericObjectBoolean { [s: string]: boolean }
export interface IgenericObject { [s: string]: string }
export interface IgenericObjectNumbers { [s: string]: number }

export interface IgeneralState {
  userControlReducer: {
    currentUser: IcurrentUser
    selectedUser: IUserInfo
    userList: IUserInfo[]
    loadedList: boolean
    updatingImage: boolean
  }
  filtersReducer: {
    startDate: Date | null,
    endDate: Date | null,
    lastUpdate: Date | null,
  }
  stagesReducer: {
    colors: IgenericObject
    stagesData: IstageCardsDataArray
    previousStagesData: IstageCardsDataArray
    filters: IswitchesConnectWise
    loading: boolean
  }
}

export interface Iselected {
  opcion: string
}

export interface IloginData {
  id: string
  ttl: number
  created: string
  userId: string
  principalType: string
  
  company: {
    companyName: string
    companyId: string
    firstName: string
    lastName: string
    connectWise: string
    infusionSoft: string
    dattoAutotask: string
    created: string
    image: string
    
  }
}

export interface IGeneralContext {
  isAuth: boolean
  activateAuth: () => void
}

export interface IBestDataStructure {
  value: number
  title: string
  amount: string
  ico: string
  variation: string
}

export interface ITeamSelectData {
  image: string
  label: string
  value: string
}

export interface ITimelineItem {
  data: {
    images: string[];
    text: string;
    time: string;
  }
}

export interface IUserInfo {
  value: string
  label: string
  image: string
}

export interface IStageStructure {
  stage_id: number
  stage: string
  currentlyInStage: number
  wereInStage: number
  averageRevenue: number
  icon: string
  is_default: boolean
  end_stage: boolean
  order: number
}

export interface IstageCardsData {
  [s: string]: IStageStructure
}

export interface IstageCardsDataArray {
  [s: string]: {
    stageCardsData: IstageCardsData
    IndicatorsData: IgenericObject[]
  }
}

export interface IcurrentUser {
  companyName?: string
  companyId: string
  type?: string
  firstName: string
  lastName: string
  email: string
  id: string
  connectWise?: string
  infusionSoft: string
  dattoAutotask: string
  PSA?: string
  CRM: string
  created: string
  image: string
  status?:{
    created: string
    trial: boolean
    payment: {
      processor: string
    }
  }
}

export interface Iswitch {
  id: number
  name: string
  danger?: boolean
  info?: boolean
}
export interface Iswitches {
  companyTypes: Iswitch[]
  companyStatuses: Iswitch[]
  companyMarkets: Iswitch[]
  companyTerritories: Iswitch[]
  companyClasifications: Iswitch[]
  contactTypes: Iswitch[]
  contactStatuses: Iswitch[]
  contactCustomers: Iswitch[]
  SyncAllContacts?: boolean
  CompaniesWithoutMarkets ?: boolean
  AccountsWithoutClassification ?: boolean
  AccountsWithoutTerritories ?: boolean
  ContactWithoutCustomers ?:boolean
  CompaniesWithoutTypes ?:boolean
  Synccontacts?: Iswitch[]
}

export interface IswitchesConnectWise {
  userSelection: Iswitches
  id: string
  connectWiseId: string
  dattoAutotaskId: string
  ApiResponse: Iswitches
}

export interface IPieData {
  name: string
  value: number
  key: string
  percentage: string
}

export interface IPieDataMainValue { [s: string]: string }

export interface ICard {
  data: IStageStructure
  id: string
  updateMetrics: (name: string, value: boolean) => void
  selectedIndicators: IgenericObjectBoolean
}
export interface IFunnel {
  
  name: string,
  money: number,
  inStage: number,
  key: string
  
}

export interface IDataFunnel {
  name: string,
  value: number,
  fill: string,
  money: number,
  id: number
  
}

export interface IReportData {
  id: number
  contactName: string
  contactPhone: string
  userName: string
  estimatedCloseDate: string
  lastUpdate: string
  opportunityTitle: string
  projectedRevenue: string
  spider: any
}

export interface IModalReport {
  show: boolean
  stage: string
  stage_id: number
  colors: IgenericObject
  setShowReport: React.Dispatch<React.SetStateAction<boolean>>
  rowData?: IReportData[]
  total: number | string
}

export interface IopportunityTitleCellParams {
  value: string
  data: IReportData
}

export interface ICardInfo {
  id: string
  number: string
  type: string
}
