import { UserActionTypes } from './user/user.types'
import { DataActionTypes } from './data/data.types'
import { UiActionTypes } from './ui/ui.types'

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

export const setSidebarState = data => ({
  type: UiActionTypes.SET_SIDEBAR_STATE,
  payload: data
})

export const setFormula = data => ({
  type: DataActionTypes.SET_FORMULA,
  payload: data
})