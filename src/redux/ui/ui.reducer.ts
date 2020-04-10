import { UiActionTypes } from './ui.types';
import { UiReducer, SetHomeOpenAction } from '../../interfaces';

const INITIAL_STATE: UiReducer = {
  homeOpen: false
};

const uiReducer = (state = INITIAL_STATE, action: SetHomeOpenAction) => {
  switch (action.type) {
    case UiActionTypes.SET_HOME_OPEN:
      return {
        ...state,
        homeOpen: action.payload
      };
    default:
      return state;
  }
};

export default uiReducer;
