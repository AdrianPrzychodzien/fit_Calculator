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

export const setWeightData = data => ({
  type: DataActionTypes.SET_WEIGHT_DATA,
  payload: data
})

export const setFinishDate = data => ({
  type: DataActionTypes.SET_FINISH_DATE,
  payload: data
})

export const setFormula = data => ({
  type: DataActionTypes.SET_FORMULA,
  payload: data
})

export const setDailyWeight = data => ({
  type: DataActionTypes.SET_DAILY_WEIGHT,
  payload: data
})

export const clearActualGoal = data => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL,
  payload: data
})

export const clearActualGoalSaveWeights = data => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS,
  payload: data
})

export const setHomeOpen = data => ({
  type: UiActionTypes.SET_HOME_OPEN,
  payload: data
})