"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_types_1 = require("./user/user.types");
var data_types_1 = require("./data/data.types");
var ui_types_1 = require("./ui/ui.types");
var circum_types_1 = require("./circum/circum.types");
exports.setCurrentUser = function (userCredentials) { return ({
    type: user_types_1.UserActionTypes.SET_CURRENT_USER,
    payload: userCredentials
}); };
exports.setData = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_USER_DATA,
    payload: data
}); };
exports.setFatData = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_FAT_DATA,
    payload: data
}); };
exports.setWeightData = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_WEIGHT_DATA,
    payload: data
}); };
exports.setFinishDate = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_FINISH_DATE,
    payload: data
}); };
exports.setFormula = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_FORMULA,
    payload: data
}); };
exports.setDailyWeight = function (data) { return ({
    type: data_types_1.DataActionTypes.SET_DAILY_WEIGHT,
    payload: data
}); };
exports.clearActualGoal = function (data) { return ({
    type: data_types_1.DataActionTypes.CLEAR_ACTUAL_GOAL,
    payload: data
}); };
exports.clearActualGoalSaveWeights = function (data) { return ({
    type: data_types_1.DataActionTypes.CLEAR_ACTUAL_GOAL_SAVE_WEIGHTS,
    payload: data
}); };
exports.clearFinishDateOnly = function (data) { return ({
    type: data_types_1.DataActionTypes.CLEAR_FINISH_DATE_ONLY,
    payload: data
}); };
exports.setHomeOpen = function (data) { return ({
    type: ui_types_1.UiActionTypes.SET_HOME_OPEN,
    payload: data
}); };
exports.setBodyFatCircum = function (data) { return ({
    type: circum_types_1.CircumActionTypes.SET_BODY_FAT_CIRCUM,
    payload: data
}); };
exports.setCircumferences = function (data) { return ({
    type: circum_types_1.CircumActionTypes.SET_CIRCUMFERENCES,
    payload: data
}); };
