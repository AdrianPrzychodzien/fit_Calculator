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
var moment_1 = require("moment");
//
// BMI equations
//
exports.calcBMI = function (data) {
    var height = data.height / 100;
    var result = (data.weight / (height * height)).toFixed(2);
    return result;
};
exports.rangeBMI = function (data) {
    var result;
    if (data < 16) {
        result = 'Severe Thinness';
    }
    else if (16 < data && data <= 17) {
        result = 'Moderate Thinness';
    }
    else if (17 < data && data <= 18.5) {
        result = 'Mild Thinness';
    }
    else if (18.5 < data && data <= 25) {
        result = 'Normal Weight';
    }
    else if (25 < data && data <= 30) {
        result = 'Overweight';
    }
    else {
        result = 'Obese';
    }
    return result;
};
exports.rangeBMIColor = function (data) {
    var result;
    if (data < 16) {
        result = 'purple';
    }
    else if (16 < data && data <= 17) {
        result = 'blue';
    }
    else if (17 < data && data <= 18.5) {
        result = 'lightblue';
    }
    else if (18.5 < data && data <= 25) {
        result = 'green';
    }
    else if (25 < data && data <= 30) {
        result = 'orange';
    }
    else {
        result = 'red';
    }
    return result;
};
exports.idealBMI = function (data) {
    var height = data.height / 100;
    var resultMax = (25 * height * height).toFixed(1);
    var resultMin = (18.5 * height * height).toFixed(1);
    return [resultMin, resultMax];
};
exports.userBmiTip = function (data) {
    var _a = exports.idealBMI(data), normalBMIMin = _a[0], normalBMIMax = _a[1];
    var userBmiTip, top, bottom;
    if (exports.rangeBMI(exports.calcBMI(data)) === 'Normal Weight') {
        top = (normalBMIMax - data.weight).toFixed(1);
        bottom = (data.weight - normalBMIMin).toFixed(1);
        userBmiTip = "You are " + bottom + "kg above and " + top + "kg below limit";
    }
    else if (exports.rangeBMI(exports.calcBMI(data)) === 'Overweight' || exports.rangeBMI(exports.calcBMI(data)) === 'Obese') {
        bottom = data.weight - normalBMIMax;
        userBmiTip = "You are " + bottom + "kg above the upper limit";
    }
    else {
        top = normalBMIMin - data.weight;
        userBmiTip = "You are " + top + "kg under the lower limit";
    }
    return userBmiTip;
};
//
// Heart Rate equations
//
exports.maxHeartRate = function (data) {
    var result;
    if (data.sex === 'Male') {
        result = 208 - (0.80 * data.age);
    }
    else if (data.sex === 'Female') {
        result = 201 - (0.63 * data.age);
    }
    return result;
};
exports.trainingHeartRate = function (max) {
    var resultMin = Math.round(max * 0.65);
    var resultMax = Math.round(max * 0.85);
    return [resultMin, resultMax];
};
//
// BMR & Resting Metabolic Age equations
//
exports.MifflinStJeor = function (data) {
    var output = Math.round(exports.restingMifflinStJeor(data) * exports.activityLevel(data.lifeActivity));
    return output;
};
exports.HarrisBenedict = function (data) {
    var output = Math.round(exports.restingHarrisBenedict(data) * exports.activityLevel(data.lifeActivity));
    return output;
};
exports.KatchMcardle = function (data) {
    var output = Math.round(exports.restingKatchMcardle(data) * exports.activityLevel(data.lifeActivity));
    return output;
};
exports.restingMifflinStJeor = function (data) {
    var sex = data.sex, weight = data.weight, height = data.height, age = data.age;
    var result;
    if (sex === 'Male') {
        result = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
    else if (sex === 'Female') {
        result = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    else {
        alert('Choose your sex');
    }
    return Math.round(result);
};
exports.restingHarrisBenedict = function (data) {
    var result;
    if (data.sex === 'Male') {
        result = (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age) + 88.362;
    }
    else if (data.sex === 'Female') {
        result = (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age) + 447.593;
    }
    else {
        alert('Choose your sex');
    }
    return Math.round(result);
};
exports.restingKatchMcardle = function (data) {
    var leanBodyMass = (data.weight * (100 - data.fat)) / 100;
    var BMR = Math.round(370 + (21.6 * leanBodyMass));
    return BMR;
};
// 
// Activity level equations
//
exports.activityLevel = function (data) {
    var result;
    switch (data) {
        case 1:
            result = 1.2;
            break;
        case 2:
            result = 1.375;
            break;
        case 3:
            result = 1.55;
            break;
        case 4:
            result = 1.725;
            break;
        case 5:
            result = 1.9;
            break;
        default:
            alert('Choose your activity level');
    }
    return result;
};
exports.activityLevelComment = function (data) {
    var result;
    switch (data) {
        case 1:
            result = 'being Sedentary';
            break;
        case 2:
            result = 'doing Light Exercise';
            break;
        case 3:
            result = 'doing Moderate Exercise';
            break;
        case 4:
            result = 'doing Heavy Exercise';
            break;
        case 5:
            result = 'working out like an Athlete';
            break;
        default:
            alert('Choose your activity level');
    }
    return result;
};
//
// Body Fat equations
//
exports.idealBodyFatPercentage = function (data) {
    var sex = data.sex, age = data.age;
    var result;
    if (sex === 'Male') {
        if (age < 20) {
            result = 8.5;
        }
        else if (20 < age && age <= 25) {
            result = 10.5;
        }
        else if (25 < age && age <= 30) {
            result = 12.7;
        }
        else if (30 < age && age <= 35) {
            result = 13.7;
        }
        else if (35 < age && age <= 40) {
            result = 15.3;
        }
        else if (40 < age && age <= 45) {
            result = 16.4;
        }
        else if (45 < age && age <= 50) {
            result = 18.9;
        }
        else if (50 < age && age <= 55) {
            result = 20.9;
        }
        else {
            result = '21+';
        }
    }
    if (sex === 'Female') {
        if (age < 20) {
            result = 17.7;
        }
        else if (20 < age && age <= 25) {
            result = 18.4;
        }
        else if (25 < age && age <= 30) {
            result = 19.3;
        }
        else if (30 < age && age <= 35) {
            result = 21.5;
        }
        else if (35 < age && age <= 40) {
            result = 22.2;
        }
        else if (40 < age && age <= 45) {
            result = 22.9;
        }
        else if (45 < age && age <= 50) {
            result = 25.5;
        }
        else if (50 < age && age <= 55) {
            result = 26.3;
        }
        else {
            result = '27+';
        }
    }
    return result;
};
exports.bodyFatFormula = function (fatData, userData) {
    var waist = fatData.waist, neck = fatData.neck, hip = fatData.hip;
    var sex = userData.sex, height = userData.height;
    var result;
    if (sex === 'Male') {
        result = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        // result = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
    }
    else if (sex === "Female") {
        waist = 0.393700787 * waist;
        neck = 0.393700787 * neck;
        hip = 0.393700787 * waist;
        height = 0.393700787 * waist;
        result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    return Math.round(result);
};
//
// Macronutrients equations
//
exports.ModerateCarb = function (data) {
    var protein = Math.round((data * 0.3) / 4);
    var carbs = Math.round((data * 0.35) / 4);
    var fats = Math.round((data * 0.35) / 9);
    return [protein, carbs, fats];
};
exports.LowCarb = function (data) {
    var protein = Math.round((data * 0.4) / 4);
    var carbs = Math.round((data * 0.2) / 4);
    var fats = Math.round((data * 0.4) / 9);
    return [protein, carbs, fats];
};
exports.HighCarb = function (data) {
    var protein = Math.round((data * 0.3) / 4);
    var carbs = Math.round((data * 0.5) / 4);
    var fats = Math.round((data * 0.2) / 9);
    return [protein, carbs, fats];
};
//
// Days equations
//
exports.diffDays = function (end) {
    var oneDay = 24 * 60 * 60 * 1000;
    var firstDate = new Date();
    var secondDate = new Date(end);
    var diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
};
// Date Format to display in WeighTrackerData
exports.myDateFormat = function (date) {
    var d = new Date(date);
    var currDay = d.getDay();
    var currDate = d.getDate();
    var currMonth = d.getMonth() + 1;
    var currYear = d.getFullYear();
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[currDay] + ", " + currDate + "-" + currMonth + "-" + currYear + " ";
};
//Return arrays of dates from date to date
exports.getActualWeekDates = function (startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment_1.default(startDate);
    var finishDate = moment_1.default(stopDate);
    while (currentDate <= finishDate) {
        dateArray.push(moment_1.default(currentDate).format('YYYY-MM-DD'));
        currentDate = moment_1.default(currentDate).add(1, 'days');
    }
    return dateArray;
};
//Return arrays of average weight in specific range of days
exports.displayAverageWeight = function (dailyWeightArray, func) {
    var actualMonday = moment_1.default().startOf('week').add(1, 'days');
    var actualSunday = moment_1.default().endOf('week').add(1, 'days');
    var lastMonday = moment_1.default().startOf('week').add(1, 'days').subtract(1, 'weeks');
    var lastSunday = moment_1.default().endOf('week').add(1, 'days').subtract(1, 'weeks');
    var beforeLastMonday = moment_1.default().startOf('week').add(1, 'days').subtract(2, 'weeks');
    var beforeLastSunday = moment_1.default().endOf('week').add(1, 'days').subtract(2, 'weeks');
    // Array of dates in actual, last and next week
    var thisWeekDates = func(actualMonday, actualSunday);
    var lastWeekDates = func(lastMonday, lastSunday);
    var beforeLastWeekDates = func(beforeLastMonday, beforeLastSunday);
    // Return array of weights that matches condition
    var listofWeights = function (myObjects, condition) {
        var list = myObjects.filter(function (item) {
            return condition.indexOf(item.date) !== -1;
        });
        var output = list.map(function (item) { return parseFloat(item.weight); });
        return output;
    };
    var thisWeekWeights = listofWeights(dailyWeightArray, thisWeekDates);
    var lastWeekWeights = listofWeights(dailyWeightArray, lastWeekDates);
    var beforeLastWeekWeights = listofWeights(dailyWeightArray, beforeLastWeekDates);
    var averageWeight = function (array) {
        return array.length === 0
            ? 0 : (array.reduce(function (a, b) { return a + b; }, 0) / array.length).toFixed(1);
    };
    var thisWeekAverage = averageWeight(thisWeekWeights);
    var lastWeekAverage = averageWeight(lastWeekWeights);
    var beforeLastWeekAverage = averageWeight(beforeLastWeekWeights);
    // thisWeek => actual week before Sunday
    return [
        thisWeekAverage || 'no data',
        lastWeekAverage || 'no data',
        beforeLastWeekAverage || 'no data'
    ];
};
exports.loseOrGain = function (data) {
    var weightGoal = data.weightGoal, dailyWeightArray = data.dailyWeightArray;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    var lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null;
    // Goal is to gain mass ? True : False
    return weightGoal > firstItem
        ? "gain " + (lastItem - firstItem).toFixed(1) + "kg"
        : "lost " + (firstItem - lastItem).toFixed(1) + "kg";
};
exports.weightTrackerInfo = function (data) {
    var weightGoal = data.weightGoal, dailyWeightArray = data.dailyWeightArray;
    var lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    var result;
    // How much to gain/lose ?
    // case => Gain weight
    if (weightGoal - firstItem > 0) {
        if (weightGoal - lastItem > 0) {
            result = (weightGoal - lastItem).toFixed(1) + "kg to gain";
        }
        else if (weightGoal - lastItem <= 0) {
            result = 'you already achieved your goal! Congratulations!';
        }
        // case => Lose weight
    }
    else if (weightGoal - firstItem < 0) {
        if (lastItem - weightGoal > 0) {
            result = (lastItem - weightGoal).toFixed(1) + "kg to lose";
        }
        else if (lastItem - weightGoal <= 0) {
            result = 'you already achieved your goal! Congratulations!';
        }
    }
    else {
        result = 'you already achieved your goal! Congratulations!';
    }
    return result;
};
// % amount of weight and time progress in challenge
exports.percentageProgress = function (data, func) {
    var start = data.start, finish = data.finish, dailyWeightArray = data.dailyWeightArray, weightGoal = data.weightGoal;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    var lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null;
    var kgLeftInGeneral;
    var kgLeftFromToday;
    var kgLeft;
    var start_ = moment_1.default(start);
    var finish_ = moment_1.default(finish);
    var daysInGeneral = finish_.diff(start_, 'days');
    var daysLeftFromToday = func(finish);
    var daysLeft = Math.round((daysLeftFromToday / daysInGeneral) * 100);
    // Goal is to lose fat ? True : False
    kgLeftFromToday = firstItem > weightGoal
        ? lastItem - weightGoal : weightGoal - lastItem;
    kgLeftInGeneral = firstItem > weightGoal
        ? firstItem - weightGoal : weightGoal - firstItem;
    kgLeft = Math.round((kgLeftFromToday / kgLeftInGeneral) * 100);
    // If you want to lose fat and you gain weight instead of losing it
    if (firstItem > weightGoal && lastItem > firstItem)
        return [Math.abs(daysLeft - 100), kgLeft = 0];
    // If you want to gain weight and you lose weight 
    else if (weightGoal > firstItem && lastItem < firstItem)
        return [Math.abs(daysLeft - 100), kgLeft = 0];
    else
        return [Math.abs(daysLeft - 100), Math.abs(kgLeft - 100)];
};
// Array of objects that tells how fast you should 
// lose weight/gain weight to stay healthy
exports.healthyProgress = function (data) {
    var start = data.start, finish = data.finish, dailyWeightArray = data.dailyWeightArray, weightGoal = data.weightGoal;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    // Change weight by 1% of body mass per day
    var healthyChange = (firstItem / 100 / 7).toFixed(2);
    var healthyArray = [];
    var finish_ = moment_1.default(finish);
    var howManyWeeks = finish_.diff(start, 'days') + 1;
    for (var i = 0; i <= howManyWeeks; i++) {
        healthyArray.push(__assign({ date: moment_1.default().startOf(start).add(i, 'days').format('YYYY-MM-DD') }, (firstItem > weightGoal
            ? { weight: firstItem - (healthyChange * i) }
            : { weight: firstItem + (healthyChange * i) })));
    }
    return healthyArray;
};
exports.HealthTips = function (data, func) {
    var finish = data.finish, dailyWeightArray = data.dailyWeightArray, weightGoal = data.weightGoal;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    var lastItem = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null;
    var obj;
    // let start_ = moment(start)
    // let finish_ = moment(finish)
    // const daysInGeneral = finish_.diff(start_, 'days')
    var daysLeftFromToday = func(finish);
    //  Gain weight or lose weight
    weightGoal - firstItem > 0
        ? obj = {
            info: "need to gain " + (weightGoal - lastItem).toFixed(1) + "kg",
            kgAmout: (weightGoal - lastItem).toFixed(1),
            days: daysLeftFromToday,
        }
        : obj = {
            info: "need to lose " + (lastItem - weightGoal).toFixed(1) + "kg",
            kgAmout: (lastItem - weightGoal).toFixed(1),
            days: daysLeftFromToday,
        };
    return obj;
};
//
// Circumferences
//
var helperChange = function (data, val) {
    var arr = [];
    for (var el in data) {
        var bodyPart = val;
        arr.push(data[el][bodyPart]);
    }
    var max = arr.reduce(function (a, b) { return Math.max(a, b); });
    var min = arr.reduce(function (a, b) { return Math.min(a, b); });
    var diff = max - min;
    return [max, min, diff];
};
exports.circumferencesChange = function (data) {
    var circums = ['waist', 'hips', 'neck', 'chest', 'shoulders', 'thighs', 'biceps'];
    var output = circums.map(function (item) {
        var _a;
        var _b = helperChange(data, item), max = _b[0], min = _b[1], diff = _b[2];
        return _a = {},
            _a[item] = {
                max: max,
                min: min,
                diff: diff
            },
            _a;
    });
    console.log(output);
    return output;
};
exports.biggestCircumChange = function (arr, trend) {
    var circums = ['waist', 'hips', 'neck', 'chest', 'shoulders', 'thighs', 'biceps'];
    // array of name and difference
    var output = [];
    for (var el in arr) {
        console.log(arr[el][circums[el]]);
        output.push({
            name: circums[el],
            value: arr[el][circums[el]].diff
        });
    }
    // sorting frm largest to smallest
    trend === 'desc'
        ? output.sort(function (a, b) { return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0); })
        : output.sort(function (a, b) { return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0); });
    console.log(output);
    return output;
};
