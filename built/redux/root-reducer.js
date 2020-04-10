"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_persist_1 = require("redux-persist");
var storage_1 = require("redux-persist/lib/storage");
var user_reducer_1 = require("./user/user.reducer");
var data_reducer_1 = require("./data/data.reducer");
var ui_reducer_1 = require("./ui/ui.reducer");
var circum_reducer_1 = require("./circum/circum.reducer");
var persistConfig = {
    key: 'root',
    storage: storage_1.default,
    whitelist: ['user', 'data', 'circum', 'ui']
};
var rootReducer = redux_1.combineReducers({
    user: user_reducer_1.default,
    data: data_reducer_1.default,
    circum: circum_reducer_1.default,
    ui: ui_reducer_1.default
});
exports.default = redux_persist_1.persistReducer(persistConfig, rootReducer);
