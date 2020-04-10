"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var WeightTrackerInfo = function () {
    var _a = react_1.useState(false), modal = _a[0], setModal = _a[1];
    var toggle = function () { return setModal(!modal); };
    return (<div>
      <reactstrap_1.Button className="rounded mt-4" color="primary" size="sm" onClick={toggle}>
        Comment on weight change
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Weight loss process</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <p>
            Though weight loss may occur faster at the start of a diet,
            experts recommend a <b>weight loss of 0.45–1.36 kg per week</b>,
            or <b>about 1% of your body weight</b>. <br /><br />
            Drastic weight changes increase the <b>risk of yo-yo effect</b>. <br /> <br />
            Rapid weight loss can increase your risk of gallstones, dehydration, and malnutrition <br />
            Other <b>side effects</b> of rapid weight loss include: headaches, irritability,
            fatigue, constipation, hair loss, menstrual irregularities and muscle loss. <br /><br />
            The green line marks a healthy weight change trend, so it is reasonable to
            stay possibly close to it.
            </p>
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>{' '}
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = WeightTrackerInfo;
