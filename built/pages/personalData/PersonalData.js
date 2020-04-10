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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var formik_1 = require("formik");
var yup = require("yup");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var BodyFatInfo_1 = require("../../components/Info/BodyFatInfo/BodyFatInfo");
var actions_1 = require("../../redux/actions");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var validationSchema = yup.object({
    height: yup.number('It must be a number').required('Height is required').positive(),
    weight: yup.number('It must be a number').required('Weight is required').positive(),
    age: yup.number('It must be a number').required('Age is required').positive(),
    fat: yup.number('It must be a number').positive().max(70, 'Are you sure?')
});
var PersonalData = function (_a) {
    var userData = _a.userData, setData = _a.setData, setDailyWeight = _a.setDailyWeight, history = _a.history;
    return (<div>
      <formik_1.Formik initialValues={{
        height: userData.height || '',
        weight: userData.weight || '',
        age: userData.age || '',
        fat: userData.fat || userData.fat || '',
        sex: userData.sex || 'Male',
        lifeActivity: userData.lifeActivity || 1,
    }} validationSchema={validationSchema} onSubmit={function (data) {
        setData(__assign({}, data));
        setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: data.weight
        });
        history.push('/');
    }}>
        {function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (<>
            <p className="h3 text-center">Add your personal data</p>
            <hr />

            <formik_1.Form className="w-100 d-flex flex-column justify-content-center">
              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-4 ml-2 text-primary" icon={free_solid_svg_icons_1.faArrowsAltV} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="height" placeholder="Height (cm)" as={core_1.TextField}/>
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faWeight} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="weight" placeholder="Weight (kg)" as={core_1.TextField}/>
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 ml-1 text-primary" icon={free_solid_svg_icons_1.faBirthdayCake} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="age" placeholder="Age" as={core_1.TextField}/>
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 ml-1 text-primary" icon={free_solid_svg_icons_1.faPercentage} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="fat" placeholder="Body fat %" as={core_1.TextField}/>
                <BodyFatInfo_1.default />
              </div>

              <div className="mx-auto my-2 w-80 d-flex">
                <div>
                  <react_fontawesome_1.FontAwesomeIcon className="mr-2 text-primary" icon={free_solid_svg_icons_1.faMale} size="2x"/>
                  <FormikFunctions_1.MyRadio type="radio" name="sex" value="Male" label="Male"/>
                </div>
                <div>
                  <react_fontawesome_1.FontAwesomeIcon className="mr-2 text-primary" icon={free_solid_svg_icons_1.faFemale} size="2x"/>
                  <FormikFunctions_1.MyRadio type="radio" name="sex" value="Female" label="Female"/>
                </div>
              </div>

              <div className="mx-auto my-1 w-100 d-flex justify-content-center">
                <FormikFunctions_1.StarsInput fieldName={'lifeActivity'}/>
              </div>

              <reactstrap_1.Button disabled={isSubmitting} type='submit' block className="d-flex justify-content-center my-3" color="primary">
                Add data
                </reactstrap_1.Button>
            </formik_1.Form>
          </>);
    }}
      </formik_1.Formik>
    </div>);
};
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setData: function (data) { return dispatch(actions_1.setData(data)); },
    setDailyWeight: function (data) { return dispatch(actions_1.setDailyWeight(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PersonalData);
