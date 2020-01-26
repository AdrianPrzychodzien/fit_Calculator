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
  userId: '',
  formula: ''
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
    case DataActionTypes.SET_FORMULA:
      return {
        ...state,
        formula: action.payload.formula
      }
    default:
      return state
  }
}

export default dataReducer