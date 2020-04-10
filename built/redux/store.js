"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_logger_1 = require("redux-logger");
var redux_persist_1 = require("redux-persist");
var root_reducer_1 = require("./root-reducer");
var middlewares = [];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(redux_logger_1.default);
}
exports.store = redux_1.createStore(root_reducer_1.default, redux_1.applyMiddleware.apply(void 0, middlewares));
exports.persistor = redux_persist_1.persistStore(exports.store);
exports.default = { store: exports.store, persistor: exports.persistor };
