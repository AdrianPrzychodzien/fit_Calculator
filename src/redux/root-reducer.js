import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import dataReducer from './data/data.reducer'
import uiReducer from './ui/ui.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['ui']
}

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
})

export default persistReducer(persistConfig, rootReducer)