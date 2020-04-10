"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var ActivityInfo = function (props) {
    var buttonLabel = props.buttonLabel, className = props.className;
    var _a = react_1.useState(false), modal = _a[0], setModal = _a[1];
    var toggle = function () { return setModal(!modal); };
    var startIcon = <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faStar} size="1x" style={{ color: '#c5a100c4' }}/>;
    return (<div>
      <reactstrap_1.Button className="rounded mb-0 ml-2" color="primary" size="sm" onClick={toggle}>
        {buttonLabel}
        <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faInfo} size="sm"/>
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className={className}>
        <reactstrap_1.ModalHeader toggle={toggle}>Activity levels</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <div>
            <p>{startIcon}<br />
              I am <b>sedentary</b> <br />(little or no exercise)</p>
          </div>
          <div>
            <p>{startIcon}{startIcon}<br />
              I am <b>lightly active</b> <br />(light exercise or sports 1-3 days per week)</p>
          </div>
          <div>
            <p>{startIcon}{startIcon}{startIcon}<br />
              I am <b>moderately active</b> <br />(moderate exercise/sports 3-5 days per week)</p>
          </div>
          <div>
            <p>{startIcon}{startIcon}{startIcon}{startIcon}<br />
              I am <b>very active</b><br /> (hard exercise/sports 6-7 days per week)</p>
          </div>
          <div>
            <p>{startIcon}{startIcon}{startIcon}{startIcon}{startIcon}<br />
              I am <b>super active</b><br /> (very hard exercise/sports and a physical job)</p>
          </div>
        </reactstrap_1.ModalBody>
        <reactstrap_1.ModalFooter>
          <reactstrap_1.Button color="primary" onClick={toggle}>Ok</reactstrap_1.Button>
        </reactstrap_1.ModalFooter>
      </reactstrap_1.Modal>
    </div>);
};
exports.default = react_router_dom_1.withRouter(ActivityInfo);
