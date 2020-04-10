"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var ActivityInfo_1 = require("../../components/Info/ActivityInfo/ActivityInfo");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var formik_1 = require("formik");
var core_1 = require("@material-ui/core");
require("./FormikFunctions.scss");
var renderStar = function (isFull) {
    var icon = isFull ? free_solid_svg_icons_1.faStar : free_regular_svg_icons_1.faStar;
    return <react_fontawesome_1.FontAwesomeIcon icon={icon} size="2x"/>;
};
var Star = function (_a) {
    var isFull = _a.isFull, onClick = _a.onClick;
    return (<span className='star' onClick={onClick}>
    {renderStar(isFull)}
  </span>);
};
var Stars = function (_a) {
    var count = _a.count, handleClick = _a.handleClick;
    return (<span className='stars'>
    {__spreadArrays(Array(5).keys()).map(function (i) { return (<Star key={i} isFull={i < count} onClick={function () { return handleClick(i + 1); }}/>); })}
  </span>);
};
Stars.defaultProps = {
    count: 1,
    handleClick: function (e) { return e; }
};
exports.StarsInput = function (_a) {
    var fieldName = _a.fieldName;
    return (<formik_1.Field name={fieldName} id={fieldName} type="number">
    {function (_a) {
        var value = _a.field.value, setFieldValue = _a.form.setFieldValue;
        return (<div className="d-flex flex-column justify-content-center align-items-center">
        <label className="h4 d-flex align-items-center">
          Life Activity
          <ActivityInfo_1.default />
        </label>
        <div>
          <Stars count={value} handleClick={function (number) { return setFieldValue(fieldName, number); }}/>
        </div>
      </div>);
    }}
  </formik_1.Field>);
};
exports.MyRadioFormula = function (_a) {
    var label = _a.label, props = __rest(_a, ["label"]);
    var field = formik_1.useField(props)[0];
    return (<label>{label} <br />
      <core_1.FormControlLabel className="d-flex justify-content-center ml-2" {...field} control={<core_1.Radio />}/>
    </label>);
};
exports.MyRadio = function (_a) {
    var label = _a.label, props = __rest(_a, ["label"]);
    var field = formik_1.useField(props)[0];
    return (<core_1.FormControlLabel {...field} control={<core_1.Radio />} label={label}/>);
};
exports.MyRadio.propTypes = {
    label: prop_types_1.default.string.isRequired
};
exports.MyTextField = function (_a) {
    var type = _a.type, placeholder = _a.placeholder, props = __rest(_a, ["type", "placeholder"]);
    var _b = formik_1.useField(props), field = _b[0], meta = _b[1];
    var errorText = meta.error && meta.touched ? meta.error : '';
    return (<>
      <core_1.TextField type={type} placeholder={placeholder} {...field} helperText={errorText} error={!!errorText}/>
    </>);
};
