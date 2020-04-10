"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var WeightInfo = function () {
    var _a = react_1.useState(false), modal = _a[0], setModal = _a[1];
    var toggle = function () { return setModal(!modal); };
    return (<div>
      <reactstrap_1.Button className="rounded ml-3 my-2" color="primary" size="sm" onClick={toggle}>
        Weight change process
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Weight loss process</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          Losing weight is usually <b>not a linear process</b>.
          <br /><br />
          Some days and weeks you may lose weight,
          while during others you may gain a little bit.
          <br /><br />
          <b>This is not a cause for concern</b>. It’s normal for body weight
          to fluctuate up and down by a few kg. For example, you may
          be carrying more food in your digestive
          system or holding on to more water than usual.
          <br /><br />
          This is even more pronounced in women, as water weight can
          fluctuate significantly during the menstrual cycle.
          <br /><br />
          As long as the <b>general trend</b> is going downwards, no matter how much it
          fluctuates, you will still succeed in losing weight <b>over the long term</b>.
          <br /><br />
          The same applies to the process of building muscle mass.
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>{' '}
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = WeightInfo;
