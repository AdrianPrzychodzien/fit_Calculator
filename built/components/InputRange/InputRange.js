"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var equations_1 = require("../../util/equations");
require("./InputRange.scss");
var InputRange = function (_a) {
    var userData = _a.userData;
    return (<div className="d-block mt-4">
    <div className="d-flex w-100 text-center font-weight-bold">
      <p style={{ width: '18%', fontSize: '0.7rem', marginBottom: 0 }}>Underweight</p>
      <p style={{ width: '32%', fontSize: '0.7rem', marginBottom: 0 }}>Normal</p>
      <p style={{ width: '25%', fontSize: '0.7rem', marginBottom: 0 }}>Overweight</p>
      <p style={{ width: '25%', fontSize: '0.7rem', marginBottom: 0 }}>Obesity</p>
    </div>
    <input type="range" min="15" max="35" value={equations_1.calcBMI(userData)} readOnly/>
  </div>);
};
exports.default = InputRange;
