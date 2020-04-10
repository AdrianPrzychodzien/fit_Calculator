"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../redux/actions");
require("./HamburgerButton.scss");
var HamburgerButton = function (_a) {
    var sidebarOpen = _a.sidebarOpen, setSidebarState = _a.setSidebarState;
    return (<button className={sidebarOpen ? "toggle__button close" : "toggle__button"} onClick={function () { return setSidebarState(!sidebarOpen); }}>
    <div className="btn-line"></div>
    <div className="btn-line"></div>
    <div className="btn-line"></div>
  </button>);
};
var mapStateToProps = function (_a) {
    var ui = _a.ui;
    return ({
        sidebarOpen: ui.sidebarOpen
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setSidebarState: function (data) { return dispatch(actions_1.setSidebarState(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HamburgerButton);
