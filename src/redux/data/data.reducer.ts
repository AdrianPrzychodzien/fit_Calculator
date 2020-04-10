import { DataActionTypes } from './data.types';
import { addNewDailyWeight } from '../utils';
import { DataReducer, SetUserDataAction } from '../../interfaces';

const INITIAL_STATE = {
  height: 0,
  weight: 0,
  age: 0,
  sex: '',
  lifeActivity: 1,
  fat: 0,
  weightGoal: 0,
  finish: new Date(),
  start: new Date(),
  dailyWeightArray: [],
  userId: 0,
  formula: ''
};

const dataReducer = (
  state: DataReducer = INITIAL_STATE,
  action: SetUserDataAction
) => {
  switch (action.type) {
    case DataActionTypes.SET_USER_DATA:
      return {
        ...state,
        height: action.payload.height,
        weight: action.payload.weight,
        age: action.payload.age,
        sex: action.payload.sex,
        lifeActivity: action.payload.lifeActivity,
        fat: action.payload.fat
      };
    case DataActionTypes.SET_FAT_DATA:
      return {
        ...state,
        fat: action.payload.fat
      };
    case DataActionTypes.SET_WEIGHT_DATA:
      return {
        ...state,
        weight: action.payload.weight,
        weightGoal: action.payload.weightGoal
      };
    case DataActionTypes.SET_FINISH_DATE:
      return {
        ...state,
        finish: action.payload.finish,
        start: action.payload.start
      };
    case DataActionTypes.SET_DAILY_WEIGHT:
      return {
        ...state,
        dailyWeightArray: addNewDailyWeight(
          state.dailyWeightArray,
          action.payload
        )
      };
    case DataActionTypes.CLEAR_ACTUAL_GOAL:
      return {
        ...state,
        start: action.payload.start,
        finish: action.payload.finish,
        weightGoal: action.payload.weightGoal,
        dailyWeightArray: action.payload.dailyWeightArray
      };
    case DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS:
      return {
        ...state,
        start: action.payload.start,
        finish: action.payload.finish,
        weightGoal: action.payload.weightGoal
      };
    case DataActionTypes.CLEAR_FINISH_DATE_ONLY:
      return {
        ...state,
        finish: action.payload.finish
      };
    case DataActionTypes.SET_FORMULA:
      return {
        ...state,
        formula: action.payload.formula
      };
    default:
      return state;
  }
};

export default dataReducer;
