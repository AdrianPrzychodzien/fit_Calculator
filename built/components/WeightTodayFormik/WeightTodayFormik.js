"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var formik_1 = require("formik");
var yup = require("yup");
var moment_1 = require("moment");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var validationSchema = yup.object({
    dailyWeight: yup.number('It must be a number').required('Weight is required').positive(),
});
var WeightTodayFormik = function (_a) {
    var setDailyWeight = _a.setDailyWeight, userData = _a.userData;
    var dailyWeightArray = userData.dailyWeightArray;
    var today = moment_1.default().toISOString().slice(0, 10);
    // const tomorrow = moment().add(1, 'days').toISOString().slice(0, 10)
    var lastWeightData = dailyWeightArray[dailyWeightArray.length - 1].date;
    var theSameDay = moment_1.default(today).isSame(lastWeightData);
    return (<formik_1.Formik initialValues={{
        dailyWeight: theSameDay ? (userData.weight || '') : '',
    }} validationSchema={validationSchema} onSubmit={function (data) {
        setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: data.dailyWeight
        });
    }}>
      {function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (<>
          <formik_1.Form className="w-100 my-4 d-flex align-items-center">
            <p className="h5 w-50">Weight today</p>
            <div className="mx-3 my-3 w-50 d-flex">
              <FormikFunctions_1.MyTextField type="number" name="dailyWeight" placeholder={theSameDay ? "" : "Complete"} as={core_1.TextField}/>
            </div>

            <reactstrap_1.Button className="ml-3" type='submit' color="primary">
              Submit
            </reactstrap_1.Button>
          </formik_1.Form>
        </>);
    }}
    </formik_1.Formik>);
};
exports.default = WeightTodayFormik;
