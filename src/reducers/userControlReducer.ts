import { GET_ALL, SET_USER, SET_USERS, SET_CURRENT_USER, SET_UPDATING_IMAGE } from '../types'
import { IUserInfo, IcurrentUser } from '../TS'
import person from '../assets/images/person.png'

interface IuserControlReducer {
  type: string
  payload: {
    single: IUserInfo
    list: IUserInfo[]
    currentUser: IcurrentUser
    updatingImage: boolean
  }
}
interface Iinitial_state {
  currentUser: IcurrentUser | null
  selectedUser: IUserInfo
  userList: IUserInfo[]
  loadedList: boolean
  updatingImage: boolean
}

const allUsers = {
  value: 'all',
  label: 'All users',
  image: person,
} 
const INITIAL_STATE: Iinitial_state = {
  currentUser: null,
  selectedUser: allUsers,
  userList: [allUsers],
  loadedList: false,
  updatingImage: false,
}

const userControlReducer = (state = INITIAL_STATE, action: IuserControlReducer) => {
  switch (action.type) {
    case GET_ALL:
      return state
    case SET_USER:
      return {
        ...state,
        selectedUser: action.payload.single,
        loadedList: true,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case SET_USERS:
      return {
        ...state,
        userList: action.payload.list
      }
    case SET_UPDATING_IMAGE:
      return {
        ...state,
        updatingImage: action.payload.updatingImage
      }
    default: return state
  }
}

export default userControlReducer
