import { CircumActionTypes } from './circum.types';
import { addNewMeasurement } from '../utils';
import {
  CircumReducer,
  SetBodyFatCircumAction,
  SetCircumferencesAction
} from '../../interfaces';

const INITIAL_STATE = {
  waist: 0,
  hip: 0,
  neck: 0,
  circumferences: []
};

type Test = SetBodyFatCircumAction | SetCircumferencesAction;
const circumReducer = (state: CircumReducer = INITIAL_STATE, action: Test) => {
  switch (action.type) {
    case CircumActionTypes.SET_BODY_FAT_CIRCUM:
      return {
        ...state,
        waist: action.payload.waist,
        hips: action.payload.hip,
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
