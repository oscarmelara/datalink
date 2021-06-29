import { IBestDataStructure, IUserInfo } from '../TS'
import person from '../assets/images/person.png'

export const tmpIndicatorsData = [
  { name: 'June', newOpportunity: 200, callScheduled: 2400, inPersonMeeting: 2100, proposalSend: 1200, closed_converted: 2000, lost_moveToFarmlist: 3200 },
  { name: 'July', newOpportunity: 3000, callScheduled: 1398, inPersonMeeting: 2210, proposalSend: 1300, closed_converted: 3600, lost_moveToFarmlist: 1200 },
  { name: 'August', newOpportunity: 2000, callScheduled: 9800, inPersonMeeting: 2290, proposalSend: 2400, closed_converted: 1100, lost_moveToFarmlist: 2200 },
  { name: 'September', newOpportunity: 2780, callScheduled: 3908, inPersonMeeting: 2000, proposalSend: 1500, closed_converted: 2100, lost_moveToFarmlist: 2200 },
  { name: 'October', newOpportunity: 1890, callScheduled: 4800, inPersonMeeting: 2181, proposalSend: 3600, closed_converted: 2900, lost_moveToFarmlist: 1200 },
  { name: 'November', newOpportunity: 2390, callScheduled: 100, inPersonMeeting: 2500, proposalSend: 1700, closed_converted: 1000, lost_moveToFarmlist: 3500 },
]

export const OpportunitiesColors: { [s: string]: string } = {
  newOpportunity: '#007AFF',
  callScheduled: '#32C4AB',
  inPersonMeeting: '#51D151',
  proposalSend: '#D8A530',
  closed_converted: '#E17740',
  lost_moveToFarmlist: '#E63E60',
}

interface IStageStructure {
  stage_id: number,
  stage: string
  currentlyInStage: number
  wereInStage: number
  averageRevenueByClient: string
  averageRevenueByProspect: string
  averageRevenue: string
  icon: string
  keyStyle?: string
}
interface IstageCardsData {
  [s: string]: IStageStructure
}

interface IPieData {
  [s: string]: {
    name: string
    value: number
    key: string
    percentage: string
  }[]
}
interface IPieDataMainValue { [s: string]: string }

export const pieData: IPieData = {
  all: [
    { name: 'New opportunity', value: 99, key: 'stage_53', percentage: '100%' },
    { name: 'Call scheduled', value: 55, key: 'stage_63', percentage: '75%' },
    { name: 'In person meeting', value: 40, key: 'stage_65', percentage: '80%' },
    { name: 'Proposal send', value: 40, key: 'stage_57', percentage: '100%' },
    { name: 'Closed/Converted', value: 25, key: 'stage_55', percentage: '60%' },
    { name: 'Lost/move to Farmlist', value: 15, key: 'stage_61', percentage: '40%' },
  ],
  user_1: [
    { name: 'New opportunity', value: 65, key: 'stage_53', percentage: '100%' },
    { name: 'Call scheduled', value: 55, key: 'stage_63', percentage: '75%' },
    { name: 'In person meeting', value: 40, key: 'stage_65', percentage: '80%' },
    { name: 'Proposal send', value: 40, key: 'stage_57', percentage: '100%' },
    { name: 'Closed/Converted', value: 25, key: 'stage_55', percentage: '60%' },
    { name: 'Lost/move to Farmlist', value: 15, key: 'stage_61', percentage: '40%' },
  ],
  user_95343: [
    { name: 'New opportunity', value: 95, key: 'stage_53', percentage: '100%' },
    { name: 'Call scheduled', value: 45, key: 'stage_63', percentage: '80%' },
    { name: 'In person meeting', value: 30, key: 'stage_65', percentage: '10%' },
    { name: 'Proposal send', value: 10, key: 'stage_57', percentage: '70%' },
    { name: 'Closed/Converted', value: 20, key: 'stage_55', percentage: '45%' },
    { name: 'Lost/move to Farmlist', value: 5, key: 'stage_61', percentage: '5%' },
  ],
  user_116813: [
    { name: 'New opportunity', value: 80, key: 'stage_53', percentage: '100%' },
    { name: 'Call scheduled', value: 35, key: 'stage_63', percentage: '80%' },
    { name: 'In person meeting', value: 20, key: 'stage_65', percentage: '40%' },
    { name: 'Proposal send', value: 60, key: 'stage_57', percentage: '50%' },
    { name: 'Closed/Converted', value: 15, key: 'stage_55', percentage: '10%' },
    { name: 'Lost/move to Farmlist', value: 5, key: 'stage_61', percentage: '1%' },
  ],
}
export const pieDataMainValue: IPieDataMainValue = {
  all: '99',
  user_1: '65',
  user_95343: '67',
  user_116813: '94',
}

export const selectOptions: IUserInfo[] = [
  {
    value: 'all',
    label: 'All users',
    image: person,
  },
  {
    value: 'user_1',
    label: 'Andrew Adams',
    image: '/img/people/person1.png',
  },
  {
    value: 'user_95343',
    label: 'Scarlett Johansson',
    image: '/img/people/person2.png',
  },
  {
    value: 'user_116813',
    label: 'Floor Jansen',
    image: '/img/people/person3.png',
  },
]

export const dataLeaderboard = [
  { name: 'June', uv: 4000 },
  { name: 'July', uv: 1390 },
  { name: 'August', uv: 3490 },
  { name: 'September', uv: 2890 },
  { name: 'October', uv: 2780 },
  { name: 'November', uv: 1890 },
]

export const dataLeaderboardUsers = [
  { name: 'Andrew Adams', value: '$120', variation: '$840', ico: 'more-ico', img: '/img/people/person1.png' },
  { name: 'Andrew Adams', value: '$120', variation: '$623', ico: 'more-ico', img: '/img/people/person2.png' },
  { name: 'Andrew Adams', value: '$120', variation: '$600', ico: 'less-ico', img: '/img/people/person3.png' },
  { name: 'Andrew Adams', value: '$120', variation: '$500', ico: 'more-ico', img: '/img/people/person4.png' },
  { name: 'Andrew Adams', value: '$120', variation: '$480', ico: 'less-ico', img: '/img/people/person5.png' },
]

// Team Select Data
export const teamSelectOptions = [
  {
    value: 'allteam',
    label: 'All Team',
    image: '/img/teams/team1.png',
  },
  {
    value: 'user1',
    label: 'Andrew Adams',
    image: '/img/people/person1.png',
  },
]

// Timeline
interface ITimelineData {
  [s: string]: {
    images: string[]
    text: string
    time: string
  }[]
}
export const timelineData: ITimelineData = {
  all: [
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 10 opportunities from "Proposal Send" at "Closed"',
      time: '1 hour',
    },
    {
      images: ['/img/people/person1.png'],
      text: 'Amelia convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '2 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '5 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 10 opportunities from "Proposal Send" at "Closed"',
      time: '8 hours',
    },
    {
      images: ['/img/people/person1.png'],
      text: 'Amelia convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '10 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '11 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 10 opportunities from "Proposal Send" at "Closed"',
      time: '12 hours',
    },
  ],
  user_1: [
    {
      images: ['/img/people/person1.png'],
      text: 'Team convert 90 opportunities from "Proposal Send" at "Closed"',
      time: '2 hour',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: '3 opportunities from "New opportunity" at "Call scheduled"',
      time: '2 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity"',
      time: '5 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 10 opportunities from "Proposal Send" at "Closed"',
      time: '8 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: 'Amelia convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '9 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '10 hours',
    },
  ],
  user_95343: [
    {
      images: ['/img/people/person1.png'],
      text: 'Team convert 90 opportunities from "Proposal Send" at "Closed"',
      time: '2 hour',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: '3 opportunities from "New opportunity" at "Call scheduled"',
      time: '2 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity"',
      time: '5 hours',
    },
  ],
  user_116813: [
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 10 opportunities from "Proposal Send" at "Closed"',
      time: '8 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png'],
      text: 'Amelia convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '9 hours',
    },
    {
      images: ['/img/people/person1.png', '/img/people/person1.png', '/img/people/person1.png'],
      text: 'Team convert 3 opportunities from "New opportunity" at "Call scheduled"',
      time: '10 hours',
    },
  ],
}

// Best values
export const bestService: IBestDataStructure[] = [
  {
    value: 85,
    title: 'Best Service or Poduct',
    amount: '$10,950',
    ico: 'more-ico',
    variation: '$10000',
  },
  {
    value: 72,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$840',
  },
  {
    value: 50,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$623',
  },
  {
    value: 45,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'less-ico',
    variation: '$600',
  },
  {
    value: 25,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$500',
  },
  {
    value: 22,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'less-ico',
    variation: '$480',
  },
]

export const bestMarketingCampaign: IBestDataStructure[] = [
  {
    value: 93,
    title: 'Best Marketing Campaign',
    amount: '$10,950',
    ico: 'more-ico',
    variation: '$10000',
  },
  {
    value: 72,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$840',
  },
  {
    value: 50,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$623',
  },
  {
    value: 45,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'less-ico',
    variation: '$600',
  },
  {
    value: 25,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'more-ico',
    variation: '$500',
  },
  {
    value: 22,
    title: 'Marketing Campaign',
    amount: '$120',
    ico: 'less-ico',
    variation: '$480',
  },
]

// Oportunity Stage Report
interface IOportunityStageReport {
  [s: string]: IStageStructure[]
}
export const oportunityStageReport: IOportunityStageReport = {
  all: [
    {
      stage_id: 53,
      stage: 'New opportunity',
      currentlyInStage: 65,
      wereInStage: 65,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'more-ico',
      keyStyle: '#007AFF',
    },
    {
      stage_id: 63,
      stage: 'Call scheduled',
      currentlyInStage: 55,
      wereInStage: 55,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'less-ico',
      keyStyle: '#32C4AB',
    },
    {
      stage_id: 65,
      stage: 'In person meeting',
      currentlyInStage: 40,
      wereInStage: 40,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'more-ico',
      keyStyle: '#51D151',
    },
    {
      stage_id: 57,
      stage: 'Proposal send',
      currentlyInStage: 40,
      wereInStage: 40,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'more-ico',
      keyStyle: '#D8A530',
    },
    {
      stage_id: 55,
      stage: 'Closed/Converted',
      currentlyInStage: 25,
      wereInStage: 25,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'less-ico',
      keyStyle: '#E17740',
    },
    {
      stage_id: 61,
      stage: 'Lost/move to Farmlist',
      currentlyInStage: 15,
      wereInStage: 15,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$15,000',
      averageRevenue: '$15,000',
      icon: 'less-ico',
      keyStyle: '#E63E60',
    },
  ],
  user_1: [
    {
      stage_id: 53,
      stage: 'New opportunity',
      currentlyInStage: 15,
      wereInStage: 15,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#007AFF',
    },
    {
      stage_id: 63,
      stage: 'Call scheduled',
      currentlyInStage: 25,
      wereInStage: 25,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#32C4AB',
    },
    {
      stage_id: 65,
      stage: 'In person meeting',
      currentlyInStage: 40,
      wereInStage: 40,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#51D151',
    },
    {
      stage_id: 57,
      stage: 'Proposal send',
      currentlyInStage: 40,
      wereInStage: 40,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#D8A530',
    },
    {
      stage_id: 55,
      stage: 'Closed/Converted',
      currentlyInStage: 25,
      wereInStage: 25,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E17740',
    },
    {
      stage_id: 61,
      stage: 'Lost/move to Farmlist',
      currentlyInStage: 15,
      wereInStage: 15,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E63E60',
    },
  ],
  user_95343: [
    {
      stage_id: 53,
      stage: 'New opportunity',
      currentlyInStage: 20,
      wereInStage: 20,
      averageRevenueByClient: '$15,000',
      averageRevenueByProspect: '$55,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#007AFF',
    },
    {
      stage_id: 63,
      stage: 'Call scheduled',
      currentlyInStage: 25,
      wereInStage: 25,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#32C4AB',
    },
    {
      stage_id: 65,
      stage: 'In person meeting',
      currentlyInStage: 40,
      wereInStage: 32,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#51D151',
    },
    {
      stage_id: 57,
      stage: 'Proposal send',
      currentlyInStage: 32,
      wereInStage: 32,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#D8A530',
    },
    {
      stage_id: 55,
      stage: 'Closed/Converted',
      currentlyInStage: 10,
      wereInStage: 10,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E17740',
    },
    {
      stage_id: 61,
      stage: 'Lost/move to Farmlist',
      currentlyInStage: 15,
      wereInStage: 15,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E63E60',
    },
  ],
  user_116813: [
    {
      stage_id: 53,
      stage: 'New opportunity',
      currentlyInStage: 30,
      wereInStage: 30,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#007AFF',
    },
    {
      stage_id: 63,
      stage: 'Call scheduled',
      currentlyInStage: 10,
      wereInStage: 10,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#32C4AB',
    },
    {
      stage_id: 65,
      stage: 'In person meeting',
      currentlyInStage: 11,
      wereInStage: 11,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#51D151',
    },
    {
      stage_id: 57,
      stage: 'Proposal send',
      currentlyInStage: 11,
      wereInStage: 11,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'more-ico',
      keyStyle: '#D8A530',
    },
    {
      stage_id: 55,
      stage: 'Closed/Converted',
      currentlyInStage: 45,
      wereInStage: 45,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E17740',
    },
    {
      stage_id: 61,
      stage: 'Lost/move to Farmlist',
      currentlyInStage: 25,
      wereInStage: 25,
      averageRevenueByClient: '$5,000',
      averageRevenueByProspect: '$5,000',
      averageRevenue: '$5,000',
      icon: 'less-ico',
      keyStyle: '#E63E60',
    },
  ]
}
/*
export const list: ICustomerInfo[] = [
  {
    id: 'RTndc8324-1',
    image: 'img/profile.jpg',
    name: 'Andrew Adams-1',
    email: 'andrew-1@gmail.com',
    type: 'Viewer',
    pending: true,
  },
  {
    id: 'RTndc8324-2',
    image: 'img/profile.jpg',
    name: 'Andrew Adams-2',
    email: 'andrew-2@gmail.com',
    type: 'Viewer',
    pending: true,
  },
  {
    id: 'RTndc8324-3',
    image: 'img/profile.jpg',
    name: 'Andrew Adams-3',
    email: 'andrew-3@gmail.com',
    type: 'Viewer',
    pending: false,
  },
  {
    id: 'RTndc8324-4',
    image: 'img/profile.jpg',
    name: 'Andrew Adams-4',
    email: 'andrew-4@gmail.com',
    type: 'Viewer',
    pending: false,
  },
  {
    id: 'RTndc8324-5',
    image: 'img/profile.jpg',
    name: 'Andrew Adams-5',
    email: 'andrew-5@gmail.com',
    type: 'Viewer',
    pending: false,
  },
]*/
