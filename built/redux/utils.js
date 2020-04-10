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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewDailyWeight = function (dailyWeightArray, itemToAdd) {
    var existingItem = dailyWeightArray.find(function (dailyWeight) { return dailyWeight.date === itemToAdd.date; });
    if (existingItem) {
        return dailyWeightArray.map(function (dailyWeight) {
            return dailyWeight.date === itemToAdd.date
                ? __assign(__assign({}, dailyWeight), { weight: itemToAdd.weight }) : dailyWeight;
        });
    }
    return __spreadArrays(dailyWeightArray, [__assign({}, itemToAdd)]);
};
exports.addNewMeasurement = function (circumArray, itemToAdd) {
    var existingItem = circumArray.find(function (circumObj) { return circumObj.date === itemToAdd.date; });
    if (existingItem) {
        return circumArray.map(function (circumObj) {
            return circumObj.date === itemToAdd.date
                ? __assign(__assign({}, circumObj), { waist: itemToAdd.waist, hip: itemToAdd.hip, neck: itemToAdd.neck, chest: itemToAdd.chest, shoulders: itemToAdd.shoulders, thighs: itemToAdd.thighs, biceps: itemToAdd.biceps }) : circumObj;
        });
    }
    return __spreadArrays(circumArray, [__assign({}, itemToAdd)]);
};
