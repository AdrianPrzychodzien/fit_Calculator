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
var ui_types_1 = require("./ui.types");
var INITIAL_STATE = {
    homeOpen: false
};
var uiReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case ui_types_1.UiActionTypes.SET_HOME_OPEN:
            return __assign(__assign({}, state), { homeOpen: action.payload });
        default:
            return state;
    }
};
exports.default = uiReducer;
