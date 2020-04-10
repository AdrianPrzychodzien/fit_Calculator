import { UserActionTypes } from './user.types';
import { UserReducer, SetCurrentUserAction } from '../../interfaces';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (
  state: UserReducer = INITIAL_STATE,
  action: SetCurrentUserAction
) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
