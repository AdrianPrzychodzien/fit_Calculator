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
var circum_types_1 = require("./circum.types");
var utils_1 = require("../utils");
var INITIAL_STATE = {
    waist: '',
    hip: '',
    neck: '',
    circumferences: []
};
var circumReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case circum_types_1.CircumActionTypes.SET_BODY_FAT_CIRCUM:
            return __assign(__assign({}, state), { waist: action.payload.waist, hips: action.payload.hips, neck: action.payload.neck });
        case circum_types_1.CircumActionTypes.SET_CIRCUMFERENCES:
            console.log(action.payload);
            return __assign(__assign({}, state), { circumferences: utils_1.addNewMeasurement(state.circumferences, action.payload) });
        default:
            return state;
    }
};
exports.default = circumReducer;
