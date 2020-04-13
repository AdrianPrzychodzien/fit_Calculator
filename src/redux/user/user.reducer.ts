import { UserActionTypes } from './user.types';
import {
  UserReducer,
  SetCurrentUserAction,
  SetHomeOpenAction
} from '../../interfaces';

const INITIAL_STATE = {
  currentUser: null,
  homeOpen: false
};

type UserReducerActionTypes = SetCurrentUserAction | SetHomeOpenAction;

const userReducer = (
  state: UserReducer = INITIAL_STATE,
  action: UserReducerActionTypes
) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_HOME_OPEN:
      return {
        ...state,
        homeOpen: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
