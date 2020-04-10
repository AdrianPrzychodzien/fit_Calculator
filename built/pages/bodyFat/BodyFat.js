"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var formik_1 = require("formik");
var yup = require("yup");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var FatPercentageInfo_1 = require("../../components/Info/FatPercentageInfo/FatPercentageInfo");
var actions_1 = require("../../redux/actions");
var equations_1 = require("../../util/equations");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var validationSchema = yup.object({
    waist: yup.number('It must be a number').required('Waist is required').positive(),
    hips: yup.number('It must be a number').required('Hips are required').positive(),
    neck: yup.number('It must be a number').required('Neck is required').positive()
});
var BodyFat = function (_a) {
    var setFatData = _a.setFatData, setBodyFatCircum = _a.setBodyFatCircum, userData = _a.userData, circumData = _a.circumData, history = _a.history;
    var _b = react_1.useState({
        open: false
    }), userSize = _b[0], setUserSize = _b[1];
    var open = userSize.open;
    var sex = userData.sex, height = userData.height, weight = userData.weight;
    var bodyFat = equations_1.bodyFatFormula(circumData, userData);
    var bodyFatMass = ((weight * bodyFat) / 100).toFixed(2);
    var leanBodyMass = (weight - bodyFatMass).toFixed(2);
    var bodyFatToLose = (bodyFat - equations_1.idealBodyFatPercentage(userData)).toFixed(1);
    return (<div>
      <formik_1.Formik initialValues={{
        waist: circumData.waist || '',
        hip: circumData.hip || '',
        neck: circumData.neck || '',
        fat: userData.fat || ''
    }} validationSchema={validationSchema} onSubmit={function (data) {
        setUserSize({
            open: true
        });
        setBodyFatCircum({
            waist: data.waist,
            hips: data.hips,
            neck: data.neck
        });
        setFatData({
            fat: bodyFat
        });
    }}>
        {function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (<>
            <p className="h3 text-center">Body fat percentage</p>
            <hr />

            <formik_1.Form className="w-100 d-flex flex-column justify-content-center">
              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faCheck} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="waist" placeholder="Waist (cm)" as={core_1.TextField}/>
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faCheck} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="hips" placeholder="Hips (cm)" as={core_1.TextField}/>
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faCheck} size="2x"/>
                <FormikFunctions_1.MyTextField type="number" name="neck" placeholder="Neck (cm)" as={core_1.TextField}/>
              </div>

              <reactstrap_1.Button disabled={isSubmitting} type='submit' block className="d-flex justify-content-center my-3" color="primary">
                Calculate
                </reactstrap_1.Button>
            </formik_1.Form>
          </>);
    }}
      </formik_1.Formik>

      <hr />
      <div className="w-100">
        {sex && height ? (open && bodyFat > 0 ? (<div>
              <div className="h3 mb-3 d-flex align-items-center justify-content-center">
                Body fat: {bodyFat}%
                  <FatPercentageInfo_1.default />
              </div>
              <p className="h5 mb-3 text-center">Body fat mass: {bodyFatMass} kg</p>
              <p className="h5 mb-3 text-center">Lean body mass: {leanBodyMass} kg</p>
              <p className="h5 mb-3 text-center">Ideal body fat for given age: {equations_1.idealBodyFatPercentage(userData)} %</p>

              {bodyFatToLose > 0 ? (<p className="h5 mb-3 text-center">Body fat to lose to reach ideal: {bodyFatToLose} %</p>) : (<p className="h5 mb-3 text-center">You are below ideal fat percentage!</p>)}

              <div className="d-flex justify-content-center mt-4" color="primary">
                <reactstrap_1.Button block className="d-flex justify-content-center my-3" color="primary" onClick={function () { return history.push('/'); }}>
                  Go to home page
                </reactstrap_1.Button>
              </div>
            </div>) : (open &&
        <p className="h6 mx-5 my-2 text-center text-danger">
              Make sure you entered your measurements correctly!
            </p>)) : (<div className="h6 mx-5 my-2 text-center text-danger">
              Make sure you added information about your sex and height!
                <br /><br />
              This data are necessary to make calculations
              <div className="form__button">
                <reactstrap_1.Button className="my-3" color="danger" onClick={function () { return history.push('/personalData'); }}>
                  Add data
                </reactstrap_1.Button>
              </div>
            </div>)}
      </div>
    </div>);
};
var mapStateToProps = function (_a) {
    var data = _a.data, circum = _a.circum;
    return ({
        userData: data,
        circumData: circum
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setFatData: function (data) { return dispatch(actions_1.setFatData(data)); },
    setBodyFatCircum: function (data) { return dispatch(actions_1.setBodyFatCircum(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BodyFat);
