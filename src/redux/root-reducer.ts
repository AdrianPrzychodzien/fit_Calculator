import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import dataReducer from './data/data.reducer';
import circumReducer from './circum/circum.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'data', 'circum']
};

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  circum: circumReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
