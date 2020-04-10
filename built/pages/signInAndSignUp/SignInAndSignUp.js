"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SignIn_1 = require("../../components/SignIn/SignIn");
var SignUp_1 = require("../../components/SignUp/SignUp");
var SignInAndSignUp = function () { return (<div className="text-center">
    <SignIn_1.default />
    <hr />
    <SignUp_1.default />
  </div>); };
exports.default = SignInAndSignUp;
