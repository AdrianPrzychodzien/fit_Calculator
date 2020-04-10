"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var equations_1 = require("../../../util/equations");
var ActivityCaloriesInfo = function (_a) {
    var userData = _a.userData;
    var _b = react_1.useState(false), modal = _b[0], setModal = _b[1];
    var toggle = function () { return setModal(!modal); };
    var kcalPerDay = function (num) {
        return Math.round(equations_1.restingMifflinStJeor(userData) * equations_1.activityLevel(num));
    };
    var lifeActivity = userData.lifeActivity;
    var userActivity = function (data, num) { return data === num && true; };
    return (<div>
      <reactstrap_1.Button className="rounded" color="primary" size="sm" onClick={toggle}>
        Calories intake on different activity level
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Calories intake</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <reactstrap_1.Table>
            <thead>
              <tr>
                <th>Activity level</th>
                <th>Kcal per day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basal Metabolic Rate</td>
                <td>{equations_1.restingMifflinStJeor(userData)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 1) ? 'font-weight-bold' : ''}>
                <td>Sedentary</td>
                <td>{kcalPerDay(1)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 2) ? 'font-weight-bold' : ''}>
                <td>Light Exercise</td>
                <td>{kcalPerDay(2)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 3) ? 'font-weight-bold' : ''}>
                <td>Moderate Exercise</td>
                <td>{kcalPerDay(3)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 4) ? 'font-weight-bold' : ''}>
                <td>Heavy Exercise</td>
                <td>{kcalPerDay(4)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 5) ? 'font-weight-bold' : ''}>
                <td>Athlete</td>
                <td>{kcalPerDay(5)}</td>
              </tr>
            </tbody>
          </reactstrap_1.Table>
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = ActivityCaloriesInfo;
