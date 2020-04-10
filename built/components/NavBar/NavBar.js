"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var firebase_utils_1 = require("../../firebase/firebase.utils");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var reactstrap_1 = require("reactstrap");
var dropdownStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    top: '3rem',
    left: 0,
    zIndex: 10
};
var NavBar = function (_a) {
    var currentUser = _a.currentUser;
    var _b = react_1.useState(false), dropdownOpen = _b[0], setDropdownOpen = _b[1];
    var toggle = function () { return setDropdownOpen(!dropdownOpen); };
    return (<div>
      <reactstrap_1.Nav tabs className="bg-primary fixed-top w-100 mx-auto h-10 d-flex flex-nowrap justify-content-between">
        <reactstrap_1.Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <reactstrap_1.DropdownToggle className="bg-primary" nav>
            {dropdownOpen ? (<react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faTimes} size="2x"/>) : (<react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faBars} size="2x"/>)}
          </reactstrap_1.DropdownToggle>
          <reactstrap_1.DropdownMenu className="w-20 py-0">
            <hr className="mt-0"/>
            <reactstrap_1.DropdownItem className="py-2">
              <react_router_dom_1.Link to="/circumferences" className='d-flex'>
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPencilRuler} size="2x"/>
                <p className="h4 ml-2">Circum</p>
              </react_router_dom_1.Link>
            </reactstrap_1.DropdownItem>
            <hr />
            <reactstrap_1.DropdownItem className="py-2">
              <react_router_dom_1.Link to="/bodyFat" className='d-flex'>
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPercentage} size="2x"/>
                <p className="h4 ml-2">Body Fat</p>
              </react_router_dom_1.Link>
            </reactstrap_1.DropdownItem>
            <hr />
            <reactstrap_1.DropdownItem className="py-2">
              <react_router_dom_1.Link to='bmi' className="d-flex">
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faBalanceScaleRight} size="2x"/>
                <p className="h4 ml-2">BMI</p>
              </react_router_dom_1.Link>
            </reactstrap_1.DropdownItem>
            <hr />
            <reactstrap_1.DropdownItem className="py-2">
              <react_router_dom_1.Link to='calories' className="d-flex">
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faUtensils} size="2x"/>
                <p className="h4 ml-2">Calories</p>
              </react_router_dom_1.Link>
            </reactstrap_1.DropdownItem>
            <hr />
            <reactstrap_1.DropdownItem className="py-2">
              <react_router_dom_1.Link to='help' className="d-flex">
                <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faQuestionCircle} size="2x"/>
                <p className="h4 ml-2">Help</p>
              </react_router_dom_1.Link>
            </reactstrap_1.DropdownItem>
            <hr className="mb-0"/>
          </reactstrap_1.DropdownMenu>
        </reactstrap_1.Dropdown>

        <p className="m-0 d-flex justify-content-center">
          <reactstrap_1.NavItem>
            <reactstrap_1.NavLink href="/">
              <react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faHome} size="2x"/>
            </reactstrap_1.NavLink>
          </reactstrap_1.NavItem>

          <reactstrap_1.NavItem>
            <reactstrap_1.NavLink href="/personalData">
              <react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faPlus} size="2x"/>
            </reactstrap_1.NavLink>
          </reactstrap_1.NavItem>

          <reactstrap_1.NavItem>
            <reactstrap_1.NavLink href="/weightTracker">
              <react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faWeight} size="2x"/>
            </reactstrap_1.NavLink>
          </reactstrap_1.NavItem>
        </p>

        {currentUser ? (<reactstrap_1.NavItem className="">
            <reactstrap_1.NavLink href='/' onClick={function () { return firebase_utils_1.auth.signOut(); }}>
              <react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faSignOutAlt} size="2x"/>
            </reactstrap_1.NavLink>
          </reactstrap_1.NavItem>) : (<reactstrap_1.NavItem className="">
              <reactstrap_1.NavLink href='/signin'>
                <react_fontawesome_1.FontAwesomeIcon color="white" icon={free_solid_svg_icons_1.faUserPlus} size="2x"/>
              </reactstrap_1.NavLink>
            </reactstrap_1.NavItem>)}
      </reactstrap_1.Nav>
      {dropdownOpen ? (<div style={dropdownStyle}/>) : null}
    </div>);
};
var mapStateToProps = function (_a) {
    var user = _a.user;
    return ({
        currentUser: user.currentUser
    });
};
exports.default = react_redux_1.connect(mapStateToProps)(NavBar);
