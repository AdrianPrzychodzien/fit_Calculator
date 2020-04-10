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
var data_types_1 = require("./data.types");
var utils_1 = require("../utils");
var INITIAL_STATE = {
    height: 0,
    weight: 0,
    age: 0,
    sex: '',
    lifeActivity: 1,
    fat: 0,
    weightGoal: 0,
    finish: 0,
    start: 0,
    dailyWeightArray: [],
    userId: 0,
    formula: ''
};
var dataReducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case data_types_1.DataActionTypes.SET_USER_DATA:
            return __assign(__assign({}, state), { height: action.payload.height, weight: action.payload.weight, age: action.payload.age, sex: action.payload.sex, lifeActivity: action.payload.lifeActivity, fat: action.payload.fat });
        case data_types_1.DataActionTypes.SET_FAT_DATA:
            return __assign(__assign({}, state), { fat: action.payload.fat });
        case data_types_1.DataActionTypes.SET_WEIGHT_DATA:
            return __assign(__assign({}, state), { weight: action.payload.weight, weightGoal: action.payload.weightGoal });
        case data_types_1.DataActionTypes.SET_FINISH_DATE:
            return __assign(__assign({}, state), { finish: action.payload.finish, start: action.payload.start });
        case data_types_1.DataActionTypes.SET_DAILY_WEIGHT:
            return __assign(__assign({}, state), { dailyWeightArray: utils_1.addNewDailyWeight(state.dailyWeightArray, action.payload) });
        case data_types_1.DataActionTypes.CLEAR_ACTUAL_GOAL:
            return __assign(__assign({}, state), { start: action.payload.start, finish: action.payload.finish, weightGoal: action.payload.weightGoal, dailyWeightArray: action.payload.dailyWeightArray });
        case data_types_1.DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS:
            return __assign(__assign({}, state), { start: action.payload.start, finish: action.payload.finish, weightGoal: action.payload.weightGoal });
        case data_types_1.DataActionTypes.CLEAR_FINISH_DATE_ONLY:
            return __assign(__assign({}, state), { finish: action.payload.finish });
        case data_types_1.DataActionTypes.SET_FORMULA:
            return __assign(__assign({}, state), { formula: action.payload.formula });
        default:
            return state;
    }
};
exports.default = dataReducer;
