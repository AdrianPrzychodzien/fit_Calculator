import { UiActionTypes } from './ui.types'

const INITIAL_STATE = {
  sidebarOpen: false
}

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.SET_SIDEBAR_STATE:
      return {
        ...state,
        sidebarOpen: action.payload
      }
    default:
      return state
  }
}

export default uiReducer