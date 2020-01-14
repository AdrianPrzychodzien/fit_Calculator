import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import dataReducer from './data/data.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data']
}

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer
})

export default persistReducer(persistConfig, rootReducer)