import { DataActionTypes } from './data.types'

const INITIAL_STATE = {
  height: '',
  weight: '',
  age: '',
  sex: '',
  lifeActivity: 1,
  fat: '',
  waist: '',
  hip: '',
  neck: '',
  weightGoal: '',
  finish: '',
  start: '',
  dailyWeight: '',
  userId: '',
  formula: '',
  homeOpen: false
}

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.SET_USER_DATA:
      return {
        ...state,
        height: action.payload.height,
        weight: action.payload.weight,
        age: action.payload.age,
        sex: action.payload.sex,
        lifeActivity: action.payload.lifeActivity,
        fat: action.payload.fat,
        userId: action.payload.userId
      }
    case DataActionTypes.SET_FAT_DATA:
      return {
        ...state,
        waist: action.payload.waist,
        hip: action.payload.hip,
        neck: action.payload.neck,
        fat: action.payload.fat,
        userId: action.payload.userId
      }
    case DataActionTypes.SET_WEIGHT_DATA:
      return {
        ...state,
        weight: action.payload.weight,
        weightGoal: action.payload.weightGoal,
        userId: action.payload.userId
      }
    case DataActionTypes.SET_FINISH_DATE:
      return {
        ...state,
        finish: action.payload.finish,
        start: action.payload.start
      }
    case DataActionTypes.SET_DAILY_WEIGHT:
      return {
        ...state,
        dailyWeight: action.payload.dailyWeight
      }
    case DataActionTypes.SET_FORMULA:
      return {
        ...state,
        formula: action.payload.formula
      }
    case DataActionTypes.SET_HOME_OPEN: // UI reducer ??
      return {
        ...state,
        homeOpen: action.payload
      }
    default:
      return state
  }
}

export default dataReducer