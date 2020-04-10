"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var DeleteGoalInfo = function (_a) {
    var clearGoal = _a.clearGoal, clearGoalSaveWeights = _a.clearGoalSaveWeights, clearFinish = _a.clearFinish, className = _a.className;
    var _b = react_1.useState(false), fadeIn = _b[0], setFadeIn = _b[1];
    var _c = react_1.useState(false), modal = _c[0], setModal = _c[1];
    var toggleFade = function () { return setFadeIn(!fadeIn); };
    var toggle = function () { return setModal(!modal); };
    return (<div>
      <reactstrap_1.Button size="sm" onClick={toggleFade}>
        Delete actual goal and set new
      </reactstrap_1.Button>
      <reactstrap_1.Fade in={fadeIn} tag="h6" className="mt-3">
        <div className="d-flex justify-content-center align-items-center">
          Are you sure?
          <reactstrap_1.Button className="ml-2" size="sm" color="danger" onClick={toggle}>
            Delete
          </reactstrap_1.Button>
        </div>
      </reactstrap_1.Fade>

      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className={className}>
        <reactstrap_1.ModalHeader toggle={toggle}>Are you sure?</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <div>
            You will lose saved information about your weight,
            as well as start and finish date from your actual goal.
          </div>
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="warning" onClick={function () { clearGoalSaveWeights(); toggleFade(); toggle(); }}>Delete but leave weights</reactstrap_1.Button>{' '}
          <reactstrap_1.Button color="danger" onClick={function () { clearGoal(); toggleFade(); toggle(); }}>Delete</reactstrap_1.Button>{' '}
          <reactstrap_1.Button color="warning" onClick={function () { clearFinish(); toggleFade(); toggle(); }}>Clear only finish date</reactstrap_1.Button>{' '}
          <reactstrap_1.Button color="primary" onClick={function () { toggleFade(); toggle(); }}>Quit</reactstrap_1.Button>
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = DeleteGoalInfo;
