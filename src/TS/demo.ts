export interface Idemo {
  demo: {
    graphqlData: { [s: string]: any }
  }
}

export interface IChart {
  labels: string[]
  label: string
  borderColor: string
  chartdata: number[]
  pointBackgroundColor: string
  height: number
  pointBorderColor: string
  pointHoverBorderColor: string
  borderWidth: number
}

export interface IChartCard {
  styleName: string
  children: React.ReactChild[]
  chartHeaderStyle?: string
}

export interface IChartCardDemo {
  lableList: string[]
  chartdata: number[]
  title: string
  subtitle: string
  color?: string
}

export interface ICustomerCell {
  data: {
    id: number
    name: string
    userId: string
    image: string
    order: number
  }
}

export interface ICountryListItem {
  country: {
    flagCode: string
    name: string
    badge: string
    badgeColor: string
  }
}

export interface IBrowserCell {
  id: string
  image: string
  title: string
  subTitle: string
}
export interface ISimpleInfo {
  icon?: string
  title: string
  sub: string
}

export interface IgetAllData {
  [s: string]: string
}

export interface IdemoAction {
  type: string
  payload: IgetAllData
}

export interface IGeneralData {
  id: number
  key: string
  value: string
  color?: string
}
export interface IsalesStatisticChart {
  id: number
  month: string
  uv: number
}
