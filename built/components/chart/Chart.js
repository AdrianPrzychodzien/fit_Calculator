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
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var WeightTrackerInfo_1 = require("../../components/Info/WeightTrackerInfo/WeightTrackerInfo");
var equations_1 = require("../../util/equations");
var recharts_1 = require("recharts");
var Chart = function (_a) {
    var userData = _a.userData;
    var weightGoal = userData.weightGoal, dailyWeightArray = userData.dailyWeightArray;
    var healthy = equations_1.healthyProgress(userData);
    var healthyArr = healthy.map(function (item) {
        return {
            day: item.date.slice(5, 10),
            healthy: item.weight
        };
    });
    // Can add healthy property to specific object?? 
    var calcHealthyProperty = function (item) {
        var output;
        for (var i = 0; i < healthyArr.length; i++) {
            if (healthyArr[i].day === item.date.slice(5, 10)) {
                output = healthyArr[i].healthy;
            }
        }
        return output;
    };
    var dailyWeights = dailyWeightArray.map(function (item) {
        return __assign({ day: item.date.slice(5, 10), weight: item.weight, goal: weightGoal }, (calcHealthyProperty(item) && { healthy: calcHealthyProperty(item) }));
    });
    var data = __spreadArrays(dailyWeights);
    var dialyMin = dailyWeightArray
        .reduce(function (min, b) { return Math.min(min, b.weight); }, dailyWeightArray[0].weight);
    var dialyMax = dailyWeightArray
        .reduce(function (max, b) { return Math.max(max, b.weight); }, dailyWeightArray[0].weight);
    var renderLineChart = (<>
      <recharts_1.LineChart width={350} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <recharts_1.Line name="actual weight" type="monotone" dot={false} strokeWidth="2" dataKey="weight" stroke="black"/>
        <recharts_1.Line name="goal" type="monotone" dot={false} strokeWidth="2" dataKey="goal" stroke="red"/>
        <recharts_1.Line name="healthy trend" type="monotone" dot={false} strokeWidth="20" dataKey="healthy" stroke="green" connectNulls={true} opacity="0.4"/>
        <recharts_1.CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
        <recharts_1.XAxis dataKey="day"/>
        <recharts_1.YAxis unit="kg" domain={[
        dialyMin < weightGoal ? dialyMin - 2 : weightGoal - 2,
        dialyMax > weightGoal ? dialyMax + 2 : weightGoal + 2
    ]}/>
        <recharts_1.Legend verticalAlign="bottom" height={10}/>
      </recharts_1.LineChart>
      <div className="d-flex justify-content-center">
        <WeightTrackerInfo_1.default />
      </div>
    </>);
    return renderLineChart;
};
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
exports.default = react_redux_1.connect(mapStateToProps, null)(Chart);
