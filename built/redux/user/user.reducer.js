"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_types_1 = require("./user.types");
var INITIAL_STATE = {
    currentUser: null
};
var userReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case user_types_1.UserActionTypes.SET_CURRENT_USER:
            return __assign(__assign({}, state), { currentUser: action.payload });
        default:
            return state;
    }
};
exports.default = userReducer;
