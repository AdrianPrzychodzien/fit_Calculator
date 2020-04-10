import { UserActionTypes } from './redux/user/user.types';
import { DataActionTypes } from './redux/data/data.types';
import { UiActionTypes } from './redux/ui/ui.types';
import { CircumActionTypes } from './redux/circum/circum.types';

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
  dailyWeightArray: number[];
  userId: number;
  formula: string;
}

export interface UiReducer {
  homeOpen: boolean;
}

export interface UserReducer {
  currentUser: any;
}

export interface CircumReducer {
  waist: number;
  hip: number;
  neck: number;
  circumferences: number[];
}

export interface SetUserDataAction {
  type: typeof DataActionTypes.SET_USER_DATA;
  payload: {
    height: number;
    weight: number;
    age: number;
    sex: string;
    lifeActivity: number;
    fat: number;
    weightGoal?: number;
    finish?: Date;
    start?: Date;
    dailyWeightArray?: number[];
    userId?: number;
    formula?: string;
  };
}

export interface SetFatDataAction {
  type: typeof DataActionTypes.SET_FAT_DATA;
  payload: { fat: number };
}

export interface SetWeightDataAction {
  type: typeof DataActionTypes.SET_WEIGHT_DATA;
  payload: { weight: number; weightGoal: number };
}

export interface SetFinishDateAction {
  type: typeof DataActionTypes.SET_FINISH_DATE;
  payload: { finish: number; start: number };
}

export interface SetFormulaAction {
  type: typeof DataActionTypes.SET_FORMULA;
  payload: { formula: string };
}

export interface SetDailyWeightAction {
  type: typeof DataActionTypes.SET_DAILY_WEIGHT;
  payload: { weight: number };
}

export interface ClearActualGoalAction {
  type: typeof DataActionTypes.CLEAR_ACTUAL_GOAL;
  payload: {
    start: number;
    finish: number;
    weightGoal: number;
    dailyWeightArray: number[];
  };
}

export interface ClearActualGoalSaveWeightsAction {
  type: typeof DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS;
  payload: { start: number; finish: number; weightGoal: number };
}

export interface ClearFinishDateOnlyAction {
  type: typeof DataActionTypes.CLEAR_FINISH_DATE_ONLY;
  payload: { finish: number };
}

export interface SetHomeOpenAction {
  type: typeof UiActionTypes.SET_HOME_OPEN;
  payload: { homeOpen: boolean };
}

export interface SetBodyFatCircumAction {
  type: typeof CircumActionTypes.SET_BODY_FAT_CIRCUM;
  payload: { waist: number; hip: number; neck: number };
}

export interface SetCircumferencesAction {
  type: typeof CircumActionTypes.SET_CIRCUMFERENCES;
  payload: {
    waist: number;
    hip: number;
    neck: number;
    chest: number;
    shoulders: number;
    thighs: number;
    biceps: number;
  };
}

export interface SetCurrentUserAction {
  type: typeof UserActionTypes.SET_CURRENT_USER;
  payload: { currentUser: any };
}
