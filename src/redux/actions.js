import { UserActionTypes } from './user/user.types'
import { DataActionTypes } from './data/data.types'

export const setCurrentUser = userCredentials => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userCredentials
})

export const setData = data => ({
  type: DataActionTypes.SET_USER_DATA,
  payload: data
})

export const setFatData = data => ({
  type: DataActionTypes.SET_FAT_DATA,
  payload: data
})

export const setFormula = data => ({
  type: DataActionTypes.SET_FORMULA,
  payload: data
})

export const setHomeOpen = data => ({
  type: DataActionTypes.SET_HOME_OPEN,
  payload: data
})