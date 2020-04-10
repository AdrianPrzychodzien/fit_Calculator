"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var equations_1 = require("../../util/equations");
var formik_1 = require("formik");
var yup = require("yup");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var moment_1 = require("moment");
var actions_1 = require("../../redux/actions");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var validationSchema = yup.object({
    waist: yup.number('It must be a number').required('Waist is required').positive(),
    hips: yup.number('It must be a number').required('Hips are required').positive(),
    neck: yup.number('It must be a number').required('Neck is required').positive(),
    chest: yup.number('It must be a number').required('Chest is required').positive(),
    shoulders: yup.number('It must be a number').required('Shoulders is required').positive(),
    thighs: yup.number('It must be a number').required('Thighs are required').positive(),
    biceps: yup.number('It must be a number').required('Biceps are required').positive(),
});
var Circumferences = function (_a) {
    var circumData = _a.circumData, setCircumferences = _a.setCircumferences, setBodyFatCircum = _a.setBodyFatCircum;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var toggle = function () { return setIsOpen(!isOpen); };
    var circumferences = circumData.circumferences;
    var circumIsEmpty = circumferences.length < 1;
    var firstUpdate = moment_1.default(circumferences[0].date).format('YYYY-MM-DD');
    var lastUpdate = moment_1.default(circumferences[circumferences.length - 1].date).format('YYYY-MM-DD');
    var nextUpdate = moment_1.default(lastUpdate).startOf(lastUpdate).add(1, 'weeks').format('YYYY-MM-DD');
    var arrayOfCircumferences = equations_1.circumferencesChange(circumferences);
    var descendingList = equations_1.biggestCircumChange(arrayOfCircumferences, 'desc');
    // const ascendingList = biggestCircumChange(arrayOfCircumferences, 'asc')
    return (<div>
      <p className="h2 text-center">Body circumferences</p>
      <hr />

      <div className="h6 w-100">
        <div className="d-flex">
          <p className="w-50 text-center mt-1 mb-3">Last update: <br /> {equations_1.myDateFormat(lastUpdate)}</p>
          <p className="w-50 text-center mt-1 mb-3">Next update: <br /> {equations_1.myDateFormat(nextUpdate)}</p>
        </div>
        <reactstrap_1.Button size="sm" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
          <react_fontawesome_1.FontAwesomeIcon icon={free_solid_svg_icons_1.faPencilRuler} className="mr-2"/>
          Update measurements
        </reactstrap_1.Button>

        
        <reactstrap_1.Collapse isOpen={isOpen}>
          <reactstrap_1.Card>
            <reactstrap_1.CardBody>
              <formik_1.Formik initialValues={{
        waist: circumIsEmpty ? '' : circumferences[circumferences.length - 1].waist || '',
        hips: circumIsEmpty ? '' : circumferences[circumferences.length - 1].hips || '',
        neck: circumIsEmpty ? '' : circumferences[circumferences.length - 1].neck || '',
        chest: circumIsEmpty ? '' : circumferences[circumferences.length - 1].chest,
        shoulders: circumIsEmpty ? '' : circumferences[circumferences.length - 1].shoulders,
        thighs: circumIsEmpty ? '' : circumferences[circumferences.length - 1].thighs,
        biceps: circumIsEmpty ? '' : circumferences[circumferences.length - 1].biceps,
    }} validationSchema={validationSchema} onSubmit={function (data) {
        setCircumferences({
            date: new Date("2020-03-03").toISOString().slice(0, 10),
            waist: data.waist,
            hips: data.hips,
            neck: data.neck,
            chest: data.chest,
            shoulders: data.shoulders,
            thighs: data.thighs,
            biceps: data.biceps
        });
        setBodyFatCircum({
            waist: data.waist,
            hips: data.hips,
            neck: data.neck
        });
    }}>
                {function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (<>
                    <formik_1.Form className="w-100 d-flex flex-column justify-content-center">
                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Waist</p>
                        <FormikFunctions_1.MyTextField type="number" name="waist" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Hips</p>
                        <FormikFunctions_1.MyTextField type="number" name="hips" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Neck</p>
                        <FormikFunctions_1.MyTextField type="number" name="neck" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Chest</p>
                        <FormikFunctions_1.MyTextField type="number" name="chest" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Shoulders</p>
                        <FormikFunctions_1.MyTextField type="number" name="shoulders" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Thighs</p>
                        <FormikFunctions_1.MyTextField type="number" name="thighs" as={core_1.TextField}/>
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Biceps</p>
                        <FormikFunctions_1.MyTextField type="number" name="biceps" as={core_1.TextField}/>
                      </div>

                      <reactstrap_1.Button type='submit' block className="d-flex justify-content-center my-3" color="primary">
                        Add measurements
                </reactstrap_1.Button>
                    </formik_1.Form>
                  </>);
    }}
              </formik_1.Formik>
            </reactstrap_1.CardBody>
          </reactstrap_1.Card>
        </reactstrap_1.Collapse>
      </div>

      <p className="h5">{equations_1.diffDays(firstUpdate)} days have passed since first measurement</p>
      <p className="h5">The biggest change occured in ..., ...cm</p>
      <p>Descending list of circums: 1. {descendingList[0].name}: {descendingList[0].value}</p>
      <p>Descending list of circums: 2. {descendingList[1].name}: {descendingList[1].value}</p>
      <p>Descending list of circums: 3. {descendingList[2].name}: {descendingList[2].value}</p>
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
    setCircumferences: function (data) { return dispatch(actions_1.setCircumferences(data)); },
    setBodyFatCircum: function (data) { return dispatch(actions_1.setBodyFatCircum(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Circumferences);
