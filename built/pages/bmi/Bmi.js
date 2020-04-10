"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var equations_1 = require("../../util/equations");
var reactstrap_1 = require("reactstrap");
var InputRange_1 = require("../../components/InputRange/InputRange");
var BodyFat = function (_a) {
    var userData = _a.userData, history = _a.history;
    var height = userData.height, weight = userData.weight, age = userData.age, sex = userData.sex, lifeActivity = userData.lifeActivity;
    var _b = equations_1.idealBMI(userData), normalBMIMin = _b[0], normalBMIMax = _b[1];
    if (height && weight && age && sex && lifeActivity) {
        return (<>
        <p className="h2 text-center">BMI Score: {equations_1.calcBMI(userData)} %</p>
        <p className="h5 my-3 text-center">Classified as <br /> {equations_1.rangeBMI(equations_1.calcBMI(userData))}</p>
        <hr />
        <p className="h5 my-3 text-center">Healthy BMI: {normalBMIMin}kg - {normalBMIMax}kg</p>
        <p className="h5 my-3 text-center">{equations_1.userBmiTip(userData)}</p>

        <InputRange_1.default userData={userData}/>
        <hr />

        <p className="h6 my-4 text-center">
          Please note that BMI is not the most
          accurate way to measure body weight.
          <br /><br />
          It fails to take into account a person`s bone density,
          waist size, age, race and other important factors
          to determine obesity.
          <br />
          Trained athletes are at a great disadvantage:
          their excess muscle puts them at a higher BMI,
          so they may be considered obese.
          <br /><br />
          For more accurate informations
          <br />
          <reactstrap_1.Button block className="d-flex justify-content-center my-4" color="primary" onClick={function () { return history.push('bodyfat'); }}>
            go to body fat page
            </reactstrap_1.Button>
        </p>
      </>);
    }
    else
        return (<>
        <p className="h3 my-5 text-center">
          Complete informations about yourself first
        </p>
        <reactstrap_1.Button onClick={function () { return history.push('./personalData'); }} block className="d-flex justify-content-center my-5" color="danger">
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
exports.default = react_redux_1.connect(mapStateToProps, null)(BodyFat);
