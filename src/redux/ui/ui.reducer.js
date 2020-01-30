import { UiActionTypes } from './ui.types'

const INITIAL_STATE = {
  homeOpen: false
}

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.SET_HOME_OPEN:
      return {
        ...state,
        homeOpen: action.payload
      }
    default:
      return state
  }
}

export default uiReducer