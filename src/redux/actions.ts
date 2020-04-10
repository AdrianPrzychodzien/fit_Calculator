import { UserActionTypes } from './user/user.types';
import { DataActionTypes } from './data/data.types';
import { UiActionTypes } from './ui/ui.types';
import { CircumActionTypes } from './circum/circum.types';
import {
  SetCurrentUserAction,
  SetUserDataAction,
  SetFatDataAction,
  SetWeightDataAction,
  SetFinishDateAction,
  SetFormulaAction,
  SetDailyWeightAction,
  ClearActualGoalAction,
  ClearActualGoalSaveWeightsAction,
  ClearFinishDateOnlyAction,
  SetHomeOpenAction,
  SetBodyFatCircumAction,
  SetCircumferencesAction
} from '../interfaces';

export const setCurrentUser = (currentUser: {
  currentUser: any;
}): SetCurrentUserAction => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: currentUser
});

export const setData = ({
  height,
  weight,
  age,
  sex,
  lifeActivity,
  fat
}: {
  height: number;
  weight: number;
  age: number;
  sex: string;
  lifeActivity: number;
  fat: number;
}): SetUserDataAction => {
  return {
    type: DataActionTypes.SET_USER_DATA,
    payload: { height, weight, age, sex, lifeActivity, fat }
  };
};

export const setFatData = ({ fat }: { fat: number }): SetFatDataAction => ({
  type: DataActionTypes.SET_FAT_DATA,
  payload: { fat }
});

export const setWeightData = ({
  weight,
  weightGoal
}: {
  weight: number;
  weightGoal: number;
}): SetWeightDataAction => ({
  type: DataActionTypes.SET_WEIGHT_DATA,
  payload: { weight, weightGoal }
});

export const setFinishDate = ({
  finish,
  start
}: {
  finish: string;
  start: string;
}): SetFinishDateAction => ({
  type: DataActionTypes.SET_FINISH_DATE,
  payload: { finish, start }
});

export const setFormula = ({
  formula
}: {
  formula: string;
}): SetFormulaAction => ({
  type: DataActionTypes.SET_FORMULA,
  payload: { formula }
});

export const setDailyWeight = ({
  date,
  weight
}: {
  date: string;
  weight: number;
}): SetDailyWeightAction => ({
  type: DataActionTypes.SET_DAILY_WEIGHT,
  payload: { date, weight }
});

export const clearActualGoal = ({
  start,
  finish,
  weightGoal,
  dailyWeightArray
}: {
  start: string;
  finish: string;
  weightGoal: number;
  dailyWeightArray: { date: string; weight: number }[];
}): ClearActualGoalAction => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL,
  payload: {
    start,
    finish,
    weightGoal,
    dailyWeightArray
  }
});

export const clearActualGoalSaveWeights = ({
  start,
  finish,
  weightGoal
}: {
  start: string;
  finish: string;
  weightGoal: number;
}): ClearActualGoalSaveWeightsAction => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS,
  payload: { start, finish, weightGoal }
});

export const clearFinishDateOnly = ({
  finish
}: {
  finish: string;
}): ClearFinishDateOnlyAction => ({
  type: DataActionTypes.CLEAR_FINISH_DATE_ONLY,
  payload: { finish }
});

export const setBodyFatCircum = ({
  waist,
  hip,
  neck
}: {
  waist: number;
  hip: number;
  neck: number;
}): SetBodyFatCircumAction => ({
  type: CircumActionTypes.SET_BODY_FAT_CIRCUM,
  payload: { waist, hip, neck }
});

export const setCircumferences = ({
  waist,
  hip,
  neck,
  chest,
  shoulders,
  thighs,
  biceps
}: {
  waist: number;
  hip: number;
  neck: number;
  chest: number;
  shoulders: number;
  thighs: number;
  biceps: number;
}): SetCircumferencesAction => ({
  type: CircumActionTypes.SET_CIRCUMFERENCES,
  payload: {
    waist,
    hip,
    neck,
    chest,
    shoulders,
    thighs,
    biceps
  }
});

export const setHomeOpen = ({
  homeOpen
}: {
  homeOpen: boolean;
}): SetHomeOpenAction => ({
  type: UiActionTypes.SET_HOME_OPEN,
  payload: { homeOpen }
});
