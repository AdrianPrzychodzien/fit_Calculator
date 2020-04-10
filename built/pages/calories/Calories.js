"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var equations_1 = require("../../util/equations");
var ActivityCaloriesInfo_1 = require("../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo");
var Macronutrients_1 = require("../../components/Tabs/Macronutrients/Macronutrients");
var reactstrap_1 = require("reactstrap");
var Calories = function (_a) {
    var userData = _a.userData, history = _a.history;
    var height = userData.height, weight = userData.weight, age = userData.age, sex = userData.sex, lifeActivity = userData.lifeActivity, fat = userData.fat, formula = userData.formula;
    var formulaOption = formula === 'MifflinStJeor' ?
        equations_1.MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
        equations_1.HarrisBenedict(userData) : equations_1.KatchMcardle(userData);
    if (height && weight && age && sex && lifeActivity && fat) {
        return (<>
        <p className="h2 text-center">Caloric needs: {formulaOption}kcal</p>
        <p className="h5 text-center my-3">
          The best estimate for your maintenance calories
           is {formulaOption} per day based on the
          {formula === 'MifflinStJeor' ? ' Mifflin - St Jeor ' : formula === 'HarrisBenedict' ?
            ' Harris Benedict ' : ' Katch-Mcardle '}
          Formula
           </p>
        <hr />

        <div className="d-flex justify-content-center my-3">
          <ActivityCaloriesInfo_1.default userData={userData}/>
        </div>
        <hr />

        <p className="h2 text-center mb-3">Macronutrients</p>

        <Macronutrients_1.default />
      </>);
    }
    else
        return (<>
        <p className="h2 text-center">
          Complete informations about yourself first
        </p>
        <reactstrap_1.Button color="danger" block className="d-flex justify-content-center my-5" onClick={function () { return history.push('./personalData'); }}>
          Go to personal data page
        </reactstrap_1.Button>
      </>);
};
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
exports.default = react_redux_1.connect(mapStateToProps, null)(Calories);
