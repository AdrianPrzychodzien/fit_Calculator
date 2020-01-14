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