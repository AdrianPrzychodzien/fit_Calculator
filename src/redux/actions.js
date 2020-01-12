import { UserActionTypes } from './user/user.types'

export const setCurrentUser = userCredentials => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: userCredentials
})