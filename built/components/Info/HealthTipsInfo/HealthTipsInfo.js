"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var HealthTipsInfo = function (_a) {
    var healthTips = _a.healthTips, dailyWeightArray = _a.dailyWeightArray, clearFinish = _a.clearFinish;
    var _b = react_1.useState(false), modal = _b[0], setModal = _b[1];
    var toggle = function () { return setModal(!modal); };
    var info = healthTips.info, kgAmout = healthTips.kgAmout, days = healthTips.days;
    var firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null;
    // max weight change = 1,5% per week
    var rapidWeightChange = (kgAmout / days * 7).toFixed(2) > ((firstItem / 100) + 0.5).toFixed(2) && true;
    return (<div>
      <reactstrap_1.Button size="sm" className="rounded my-2" color={rapidWeightChange ? "warning" : "primary"} onClick={toggle}>
        {rapidWeightChange ? "Fast pace of weight change!" : 'Healthy pace of weight change'}
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Health tips</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <p>
            According to the entered data you <b>{info}</b> in <b>{days} days</b>,
          which forces you to change your body weight
          by <b>{(kgAmout / days).toFixed(2)}kg per day</b>{' '}
            (<b>{(kgAmout / days * 7).toFixed(2)}kg per week</b>)
          </p>
          <div>
            Healthy pace of lost/gain weight is about 1% of your body weight. <br /><br />
            {rapidWeightChange ? (<p style={{ color: 'red', fontWeight: 'bold' }}>You will need to change weight too quickly!
              Consider slowing down to prevent side effects, like yo-yo effect. <br />
                Mayby you should extend timeline?</p>) : (<p style={{ color: 'green', fontWeight: 'bold' }}>You are changing your weight in healthy pace! Well done!</p>)}
          </div>
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>
          {rapidWeightChange
        && <reactstrap_1.Button color="warning" onClick={function () { return clearFinish(); }}>
              Change finish date
            </reactstrap_1.Button>}
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = HealthTipsInfo;
