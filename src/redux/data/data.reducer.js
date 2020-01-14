import { DataActionTypes } from './data.types'

const INITIAL_STATE = {
  height: '',
  weight: '',
  age: '',
  sex: '',
  lifeActivity: 1
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
        lifeActivity: action.payload.lifeActivity
      }
    default:
      return state
  }
}

export default dataReducer