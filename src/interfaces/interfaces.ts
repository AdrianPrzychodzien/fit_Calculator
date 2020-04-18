import { UserActionTypes } from '../redux/user/user.types';
import { DataActionTypes } from '../redux/data/data.types';
import { CircumActionTypes } from '../redux/circum/circum.types';

export interface State {
  user: UserReducer;
  data: DataReducer;
  circum: CircumReducer;
}

export interface DataReducer {
  height: number;
  weight: number;
  age: number;
  sex: string;
  lifeActivity: number;
  fat: number;
  weightGoal: number;
  finish: Date;
  start: Date;
  dailyWeightArray: { date: string; weight: number }[];
  userId: number;
  formula: string;
}

export interface UserReducer {
  currentUser: any;
  homeOpen: boolean;
}

export interface CircumReducer {
  waist: number;
  hips: number;
  neck: number;
  circumferences: any[];
}

export interface SetUserDataInterface {
  height: number;
  weight: number;
  age: number;
  sex: string;
  lifeActivity: number;
  fat: number;
}

export interface SetUserDataAction {
  type: DataActionTypes.SET_USER_DATA;
  payload: {
    height: number;
    weight: number;
    age: number;
    sex: string;
    lifeActivity: number;
    fat: number;
  };
}

export interface SetFatDataInterface {
  fat: number;
}

export interface SetFatDataAction {
  type: DataActionTypes.SET_FAT_DATA;
  payload: { fat: number };
}

export interface SetWeightDataInterface {
  weight: number;
  weightGoal: number;
}

export interface SetWeightDataAction {
  type: DataActionTypes.SET_WEIGHT_DATA;
  payload: { weight: number; weightGoal: number };
}

export interface SetFinishDateInterface {
  finish: string;
  start: string;
}

export interface SetFinishDateAction {
  type: DataActionTypes.SET_FINISH_DATE;
  payload: { finish: string; start: string };
}

export interface SetFormulaInterface {
  formula: string;
}

export interface SetFormulaAction {
  type: DataActionTypes.SET_FORMULA;
  payload: { formula: string };
}

export interface SetDailyWeightInterface {
  date: string;
  weight: number;
}

export interface SetDailyWeightAction {
  type: DataActionTypes.SET_DAILY_WEIGHT;
  payload: { date: string; weight: number };
}

export interface ClearActualGoalInterface {
  start: string;
  finish: string;
  weightGoal: number;
  dailyWeightArray: { date: string; weight: number }[];
}

export interface ClearActualGoalAction {
  type: DataActionTypes.CLEAR_ACTUAL_GOAL;
  payload: {
    start: string;
    finish: string;
    weightGoal: number;
    dailyWeightArray: { date: string; weight: number }[];
  };
}

export interface ClearActualGoalSaveWeightsInterface {
  start: string;
  finish: string;
  weightGoal: number;
}

export interface ClearActualGoalSaveWeightsAction {
  type: DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS;
  payload: { start: string; finish: string; weightGoal: number };
}

export interface ClearFinishDateOnlyInterface {
  finish: string;
}

export interface ClearFinishDateOnlyAction {
  type: DataActionTypes.CLEAR_FINISH_DATE_ONLY;
  payload: { finish: string };
}

export interface SetHomeOpenInterface {
  homeOpen: boolean;
}

export interface SetHomeOpenAction {
  type: UserActionTypes.SET_HOME_OPEN;
  payload: { homeOpen: boolean };
}

export interface SetBodyFatCircumInterface {
  waist: number;
  hips: number;
  neck: number;
}

export interface SetBodyFatCircumAction {
  type: CircumActionTypes.SET_BODY_FAT_CIRCUM;
  payload: { waist: number; hips: number; neck: number };
}

export interface SetCircumferencesInterface {
  date: string;
  waist: number;
  hips: number;
  neck: number;
  chest: number;
  shoulders: number;
  thighs: number;
  biceps: number;
}

export interface SetCircumferencesAction {
  type: CircumActionTypes.SET_CIRCUMFERENCES;
  payload: {
    date: string;
    waist: number;
    hips: number;
    neck: number;
    chest: number;
    shoulders: number;
    thighs: number;
    biceps: number;
  };
}

export interface SetCurrentUserInterface {
  currentUser: any;
}

export interface SetCurrentUserAction {
  type: UserActionTypes.SET_CURRENT_USER;
  payload: { currentUser: any };
}
