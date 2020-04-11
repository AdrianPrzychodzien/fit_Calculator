import { UserActionTypes } from './user/user.types';
import { DataActionTypes } from './data/data.types';
import { UiActionTypes } from './ui/ui.types';
import { CircumActionTypes } from './circum/circum.types';
import {
  SetCurrentUserAction,
  SetCurrentUserInterface,
  SetUserDataAction,
  SetUserDataInterface,
  SetFatDataAction,
  SetFatDataInterface,
  SetWeightDataAction,
  SetWeightDataInterface,
  SetFinishDateAction,
  SetFinishDateInterface,
  SetFormulaAction,
  SetFormulaInterface,
  SetDailyWeightAction,
  SetDailyWeightInterface,
  ClearActualGoalAction,
  ClearActualGoalInterface,
  ClearActualGoalSaveWeightsAction,
  ClearActualGoalSaveWeightInterface,
  ClearFinishDateOnlyAction,
  ClearFinishDateOnlyInterface,
  SetHomeOpenAction,
  SetHomeOpenInterface,
  SetBodyFatCircumAction,
  SetBodyFatCircumInterface,
  SetCircumferencesAction,
  SetCircumferencesInterface
} from '../interfaces';

export const setCurrentUser = (
  currentUser: SetCurrentUserInterface
): SetCurrentUserAction => ({
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
}: SetUserDataInterface): SetUserDataAction => {
  return {
    type: DataActionTypes.SET_USER_DATA,
    payload: { height, weight, age, sex, lifeActivity, fat }
  };
};

export const setFatData = ({ fat }: SetFatDataInterface): SetFatDataAction => ({
  type: DataActionTypes.SET_FAT_DATA,
  payload: { fat }
});

export const setWeightData = ({
  weight,
  weightGoal
}: SetWeightDataInterface): SetWeightDataAction => ({
  type: DataActionTypes.SET_WEIGHT_DATA,
  payload: { weight, weightGoal }
});

export const setFinishDate = ({
  finish,
  start
}: SetFinishDateInterface): SetFinishDateAction => ({
  type: DataActionTypes.SET_FINISH_DATE,
  payload: { finish, start }
});

export const setFormula = ({
  formula
}: SetFormulaInterface): SetFormulaAction => ({
  type: DataActionTypes.SET_FORMULA,
  payload: { formula }
});

export const setDailyWeight = ({
  date,
  weight
}: SetDailyWeightInterface): SetDailyWeightAction => ({
  type: DataActionTypes.SET_DAILY_WEIGHT,
  payload: { date, weight }
});

export const clearActualGoal = ({
  start,
  finish,
  weightGoal,
  dailyWeightArray
}: ClearActualGoalInterface): ClearActualGoalAction => ({
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
}: ClearActualGoalSaveWeightInterface): ClearActualGoalSaveWeightsAction => ({
  type: DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS,
  payload: { start, finish, weightGoal }
});

export const clearFinishDateOnly = ({
  finish
}: ClearFinishDateOnlyInterface): ClearFinishDateOnlyAction => ({
  type: DataActionTypes.CLEAR_FINISH_DATE_ONLY,
  payload: { finish }
});

export const setBodyFatCircum = ({
  waist,
  hips,
  neck
}: SetBodyFatCircumInterface): SetBodyFatCircumAction => ({
  type: CircumActionTypes.SET_BODY_FAT_CIRCUM,
  payload: { waist, hips, neck }
});

export const setCircumferences = ({
  waist,
  hips,
  neck,
  chest,
  shoulders,
  thighs,
  biceps
}: SetCircumferencesInterface): SetCircumferencesAction => ({
  type: CircumActionTypes.SET_CIRCUMFERENCES,
  payload: {
    waist,
    hips,
    neck,
    chest,
    shoulders,
    thighs,
    biceps
  }
});

export const setHomeOpen = ({
  homeOpen
}: SetHomeOpenInterface): SetHomeOpenAction => ({
  type: UiActionTypes.SET_HOME_OPEN,
  payload: { homeOpen }
});
