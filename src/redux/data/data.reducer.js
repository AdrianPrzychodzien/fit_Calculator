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
  userId: ''
}

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.SET_USER_DATA:
      return {
        ...state,
        height: action.payload.userData.height,
        weight: action.payload.userData.weight,
        age: action.payload.userData.age,
        sex: action.payload.userData.sex,
        lifeActivity: action.payload.userData.lifeActivity,
        fat: action.payload.userData.fat,
        userId: action.payload.userId
      }
    case DataActionTypes.SET_FAT_DATA:
      return {
        ...state,
        waist: action.payload.userSize.waist,
        hip: action.payload.userSize.hip,
        neck: action.payload.userSize.neck,
        userId: action.payload.userId
      }
    case DataActionTypes.SET_FAT_PERCENTAGE:
      return {
        ...state,
        fat: action.payload.fatPercentage,
        userId: action.payload.userId
      }
    default:
      return state
  }
}

export default dataReducer