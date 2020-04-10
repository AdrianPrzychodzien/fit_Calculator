"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var reactstrap_1 = require("reactstrap");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var FatPercentageInfo = function () {
    var _a = react_1.useState(false), modal = _a[0], setModal = _a[1];
    var toggle = function () { return setModal(!modal); };
    return (<div>
      <reactstrap_1.Button className="rounded mb-0 ml-2" color="primary" size="sm" onClick={toggle}>
        <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faInfo} size="sm"/>
      </reactstrap_1.Button>
      <reactstrap_1.Modal isOpen={modal} toggle={toggle} className="mt-5">
        <reactstrap_1.ModalHeader toggle={toggle}>Fat % Categories</reactstrap_1.ModalHeader>
        <reactstrap_1.ModalBody className="text-center">
          <reactstrap_1.Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Women</th>
                <th>Men</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential Fat</td>
                <td>10-13%</td>
                <td>2-5%</td>
              </tr>
              <tr>
                <td>Athletes</td>
                <td>14-20%</td>
                <td>6-13%</td>
              </tr>
              <tr>
                <td>Fitness</td>
                <td>21-24%</td>
                <td>14-17%</td>
              </tr>
              <tr>
                <td>Acceptable</td>
                <td>25-31%</td>
                <td>18-24%</td>
              </tr>
              <tr>
                <td>Obese</td>
                <td>32%+</td>
                <td>25%+</td>
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
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
exports.default = react_redux_1.connect(mapStateToProps, null)(FatPercentageInfo);
