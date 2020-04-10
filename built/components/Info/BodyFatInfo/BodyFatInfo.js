"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var BodyFatInfo = function (_a) {
    var history = _a.history;
    var _b = react_1.useState(false), modal = _b[0], setModal = _b[1];
    var toggle = function () { return setModal(!modal); };
    return (<div>
      <reactstrap_1.Button className="rounded mb-0 ml-2" color="primary" size="sm" onClick={toggle}>
        <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faInfo} size="sm"/>
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Body fat info</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          You can check your body fat percentage by using <b>skinfold caliper</b>,
          but the most commonly used estimation formula in body fat percentage calculations
          is the <b>U.S. Navy fitness formula.</b>
          <br /><br />
          Calculation require giving body measurements in specific areas.
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>{' '}
          <reactstrap_1.Button color="danger" onClick={function () { return history.push('/bodyFat'); }}>
            Add them here
          </reactstrap_1.Button>
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = react_router_dom_1.withRouter(BodyFatInfo);
