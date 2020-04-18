import { CircumActionTypes } from './circum.types';
import { addNewMeasurement } from '../utils';
import {
  CircumReducer,
  SetBodyFatCircumAction,
  SetCircumferencesAction
} from '../../interfaces/interfaces';

const INITIAL_STATE = {
  waist: 0,
  hips: 0,
  neck: 0,
  circumferences: []
};

type CircumReducerActionTypes =
  | SetBodyFatCircumAction
  | SetCircumferencesAction;
const circumReducer = (
  state: CircumReducer = INITIAL_STATE,
  action: CircumReducerActionTypes
) => {
  switch (action.type) {
    case CircumActionTypes.SET_BODY_FAT_CIRCUM:
      return {
        ...state,
        waist: action.payload.waist,
        hips: action.payload.hips,
        neck: action.payload.neck
      };
    case CircumActionTypes.SET_CIRCUMFERENCES:
      return {
        ...state,
        circumferences: addNewMeasurement(state.circumferences, action.payload)
      };
    default:
      return state;
  }
};

export default circumReducer;
