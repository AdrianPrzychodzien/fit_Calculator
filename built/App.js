"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Home_1 = require("./pages/home/Home");
var PersonalData_1 = require("./pages/personalData/PersonalData");
var Help_1 = require("./pages/help/Help");
var BodyFat_1 = require("./pages/bodyFat/BodyFat");
var SignInAndSignUp_1 = require("./pages/signInAndSignUp/SignInAndSignUp");
var Bmi_1 = require("./pages/bmi/Bmi");
var Calories_1 = require("./pages/calories/Calories");
var WeightTracker_1 = require("./pages/weight/WeightTracker");
var Circumferences_1 = require("./pages/circumferences/Circumferences");
var NavBar_1 = require("./components/NavBar/NavBar");
var firebase_utils_1 = require("./firebase/firebase.utils");
var actions_1 = require("./redux/actions");
var reactstrap_1 = require("reactstrap");
var App = function (_a) {
    var currentUser = _a.currentUser, setCurrentUser = _a.setCurrentUser;
    react_1.useEffect(function () {
        var unsubscribeFromAuth = null;
        unsubscribeFromAuth = firebase_utils_1.auth.onAuthStateChanged(function (userAuth) { return __awaiter(void 0, void 0, void 0, function () {
            var userRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userAuth) return [3 /*break*/, 2];
                        return [4 /*yield*/, firebase_utils_1.createUserProfileDocument(userAuth)];
                    case 1:
                        userRef = _a.sent();
                        userRef.onSnapshot(function (snapShot) {
                            setCurrentUser(__assign({ id: snapShot.id }, snapShot.data()));
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        setCurrentUser(userAuth);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return function () { return unsubscribeFromAuth(); };
    }, [setCurrentUser]);
    return (<react_router_dom_1.BrowserRouter>
      <div style={{ maxWidth: '415px', margin: '0 auto' }}>
        <reactstrap_1.Jumbotron fluid className="pt-5">
          <NavBar_1.default />
          <reactstrap_1.Container fluid className="mt-3">
            <react_router_dom_1.Switch>
              <react_router_dom_1.Route exact path='/' component={Home_1.default}/>
              <react_router_dom_1.Route exact path='/personalData' component={PersonalData_1.default}/>
              <react_router_dom_1.Route exact path='/help' component={Help_1.default}/>
              <react_router_dom_1.Route exact path='/bodyFat' component={BodyFat_1.default}/>
              <react_router_dom_1.Route exact path='/bmi' component={Bmi_1.default}/>
              <react_router_dom_1.Route exact path='/calories' component={Calories_1.default}/>
              <react_router_dom_1.Route exact path='/weightTracker' component={WeightTracker_1.default}/>
              <react_router_dom_1.Route exact path='/circumferences' component={Circumferences_1.default}/>
              <react_router_dom_1.Route exact path='/signin' render={function () {
        return currentUser ? (<react_router_dom_1.Redirect to='/'/>) : (<SignInAndSignUp_1.default />);
    }}/>
            </react_router_dom_1.Switch>
          </reactstrap_1.Container>
        </reactstrap_1.Jumbotron>
      </div>
    </react_router_dom_1.BrowserRouter>);
};
var mapStateToProps = function (_a) {
    var user = _a.user;
    return ({
        currentUser: user.currentUser
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setCurrentUser: function (user) { return dispatch(actions_1.setCurrentUser(user)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
