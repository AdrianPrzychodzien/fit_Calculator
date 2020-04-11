import { UserActionTypes } from './redux/user/user.types';
import { DataActionTypes } from './redux/data/data.types';
import { UiActionTypes } from './redux/ui/ui.types';
import { CircumActionTypes } from './redux/circum/circum.types';

export interface State {
  user: UserReducer;
  data: DataReducer;
  circum: CircumReducer;
  ui: UiReducer;
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

export interface UiReducer {
  homeOpen: boolean;
}

export interface UserReducer {
  currentUser: any;
}

export interface CircumReducer {
  waist: number;
  hips: number;
  neck: number;
  circumferences: number[];
}

export interface SetUserDataInterface {
  height: number;
  weight: number;
  age: number;
  sex: string;
  lifeActivity: number;
  fat: number;
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
    dailyWeightArray?: { date: string; weight: number }[];
    userId?: number;
    formula?: string;
  };
}

export interface SetFatDataInterface {
  fat: number;
}

export interface SetFatDataAction {
  type: typeof DataActionTypes.SET_FAT_DATA;
  payload: { fat: number };
}

export interface SetWeightDataInterface {
  weight: number;
  weightGoal: number;
}

export interface SetWeightDataAction {
  type: typeof DataActionTypes.SET_WEIGHT_DATA;
  payload: { weight: number; weightGoal: number };
}

export interface SetFinishDateAction {
  type: typeof DataActionTypes.SET_FINISH_DATE;
  payload: { finish: string; start: string };
}

export interface SetFormula {
  formula: string;
}

export interface SetFormulaAction {
  type: typeof DataActionTypes.SET_FORMULA;
  payload: { formula: string };
}

export interface SetDailyWeightInterface {
  date: string;
  weight: number;
}

export interface SetDailyWeightAction {
  type: typeof DataActionTypes.SET_DAILY_WEIGHT;
  payload: { date: string; weight: number };
}

export interface ClearActualGoalAction {
  type: typeof DataActionTypes.CLEAR_ACTUAL_GOAL;
  payload: {
    start: string;
    finish: string;
    weightGoal: number;
    dailyWeightArray: { date: string; weight: number }[];
  };
}

export interface ClearActualGoalSaveWeightsAction {
  type: typeof DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS;
  payload: { start: string; finish: string; weightGoal: number };
}

export interface ClearFinishDateOnlyAction {
  type: typeof DataActionTypes.CLEAR_FINISH_DATE_ONLY;
  payload: { finish: string };
}

export interface SetHomeOpen {
  homeOpen: boolean;
}

export interface SetHomeOpenAction {
  type: typeof UiActionTypes.SET_HOME_OPEN;
  payload: { homeOpen: boolean };
}

export interface SetBodyFatCircumInterface {
  waist: number;
  hips: number;
  neck: number;
}

export interface SetBodyFatCircumAction {
  type: typeof CircumActionTypes.SET_BODY_FAT_CIRCUM;
  payload: { waist: number; hips: number; neck: number };
}

export interface SetCircumferencesAction {
  type: typeof CircumActionTypes.SET_CIRCUMFERENCES;
  payload: {
    waist: number;
    hips: number;
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
