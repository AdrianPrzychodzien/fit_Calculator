"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var formik_1 = require("formik");
var yup = require("yup");
var react_datepicker_1 = require("react-datepicker");
require("react-datepicker/dist/react-datepicker.css");
var react_circular_progressbar_1 = require("react-circular-progressbar");
require("react-circular-progressbar/dist/styles.css");
var moment_1 = require("moment");
var equations_1 = require("../../util/equations");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var DeleteGoalInfo_1 = require("../../components/Info/DeleteGoalInfo/DeleteGoalInfo");
var WeightTrackerData_1 = require("../../components/Tabs/WeightTrackerData/WeightTrackerData");
var WeightInfo_1 = require("../../components/Info/WeightInfo/WeightInfo");
var HealthTipsInfo_1 = require("../../components/Info/HealthTipsInfo/HealthTipsInfo");
var WeightTodayFormik_1 = require("../../components/WeightTodayFormik/WeightTodayFormik");
var actions_1 = require("../../redux/actions");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var validationSchema = yup.object({
    weight: yup.number('It must be a number').required('Weight is required').positive(),
    weightGoal: yup.number('It must be a number').required('Weight is required').positive()
});
var WeightTracker = function (_a) {
    var userData = _a.userData, setWeightData = _a.setWeightData, setFinishDate = _a.setFinishDate, setDailyWeight = _a.setDailyWeight, clearActualGoal = _a.clearActualGoal, clearActualGoalSaveWeights = _a.clearActualGoalSaveWeights, clearFinishDateOnly = _a.clearFinishDateOnly;
    var _b = react_1.useState(null), date = _b[0], setDate = _b[1];
    var weightGoal = userData.weightGoal, finish = userData.finish, dailyWeightArray = userData.dailyWeightArray;
    var weightToday = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null;
    var weightYesterday = dailyWeightArray.length > 1 ? dailyWeightArray[dailyWeightArray.length - 2].weight : null;
    // if input in DatePicker is empty set finish date to 4 weeks from today
    var finishDate = (new Date(date).toISOString().slice(0, 10) === '1970-01-01')
        ? (moment_1.default().startOf('today').add(3, 'weeks')._d).toISOString().slice(0, 10)
        : new Date(date).toISOString().slice(0, 10);
    var _c = equations_1.percentageProgress(userData, equations_1.diffDays), daysCompletionPercentage = _c[0], kgCompletionPercentage = _c[1];
    var healthTips = equations_1.HealthTips(userData, equations_1.diffDays);
    var clearGoal = function () {
        clearActualGoal({
            start: '',
            finish: '',
            weightGoal: '',
            dailyWeightArray: []
        });
    };
    var clearGoalSaveWeights = function () {
        clearActualGoalSaveWeights({
            start: '',
            finish: '',
            weightGoal: ''
        });
    };
    var clearFinish = function () {
        clearFinishDateOnly({
            finish: ''
        });
    };
    return (<>
      <p className="h2 text-center">Weight Tracker</p>

      {!finish ? (<>
          
          <formik_1.Formik initialValues={{
        weight: userData.weight || '',
        weightGoal: userData.weightGoal || '',
    }} validationSchema={validationSchema} onSubmit={function (data) {
        setWeightData({
            weight: data.weight,
            weightGoal: data.weightGoal
        });
        setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: data.weight,
        });
    }}>
            {function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (<>
                <formik_1.Form className="w-100 d-flex justify-content-center">
                  <div className="mx-3 my-3 w-50 d-flex">
                    <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faWeight} size="2x"/>
                    <FormikFunctions_1.MyTextField type="number" name="weight" placeholder="Weight" as={core_1.TextField}/>
                  </div>
                  <div className="mx-3 my-3 w-50 d-flex">
                    <react_fontawesome_1.FontAwesomeIcon className="mr-3 text-primary" icon={free_solid_svg_icons_1.faBullseye} size="2x"/>
                    <FormikFunctions_1.MyTextField type="number" name="weightGoal" placeholder="Goal" as={core_1.TextField}/>
                  </div>

                  <reactstrap_1.Button className="mx-1 my-2 h-25" type='submit' color="primary">
                    {weightGoal ? 'Change' : 'Add'}
                  </reactstrap_1.Button>
                </formik_1.Form>
              </>);
    }}
          </formik_1.Formik>

          
          {weightGoal && <div className="d-flex justify-content-center align-items-center">
            <react_datepicker_1.default className="my-2 mr-3 text-center border-0" selected={date} onChange={function (date) { return setDate(date); }} dateFormat="dd/MM/yyyy" placeholderText="Select a date" minDate={moment_1.default().startOf('today').add(3, 'weeks')._d} required/>
            <reactstrap_1.Button onClick={function () { return setFinishDate({
        finish: finishDate,
        start: new Date().toISOString().slice(0, 10)
    }); }} color="primary">
              Add
            </reactstrap_1.Button>
          </div>}
        </>) : (<>
            
            <WeightTodayFormik_1.default setDailyWeight={setDailyWeight} userData={userData}/>

            <div className="text-center h5 my-4">
              {weightToday === weightYesterday ? (<p>The same weight as yesterday</p>) : (dailyWeightArray.length >= 2 ? (<p>
                      Actual weight <b>{(weightToday)}kg</b><br />
                      <b>{(Math.abs(weightToday - weightYesterday)).toFixed(1)}kg</b>
                      {weightToday - weightYesterday < 0 ? ' less' : ' more'} than yesterday
                    </p>) : (<p>Actual weight {weightToday}kg</p>))}
            </div>
            <div className="text-center h5 my-4">
              <b>{(equations_1.diffDays(finish))} days</b> left and <b>{equations_1.weightTrackerInfo(userData)}</b>
            </div>

            <div className="d-flex justify-content-center">
              <HealthTipsInfo_1.default healthTips={healthTips} dailyWeightArray={dailyWeightArray} clearFinish={clearFinish}/>
              <WeightInfo_1.default />
            </div>

            
            <div className="d-flex my-1">
              <div className="text-center h5 my-2 mx-2 w-50">
                <p>Time progress</p>
                <react_circular_progressbar_1.CircularProgressbar value={daysCompletionPercentage} text={daysCompletionPercentage + "%"} circleRatio={0.75} styles={react_circular_progressbar_1.buildStyles({
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: "butt",
        trailColor: "lightgray"
    })}/>
              </div>
              <div className="text-center h5 my-2 mx-2 w-50">
                <p>Weight progress</p>
                <react_circular_progressbar_1.CircularProgressbar value={kgCompletionPercentage} text={kgCompletionPercentage + "%"} circleRatio={0.75} styles={react_circular_progressbar_1.buildStyles({
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: "butt",
        trailColor: "lightgray"
    })}/>
              </div>
            </div>

          </>)}

      <hr />
      <p className="h2 text-center mb-3">Weight Tracker data</p>

      <WeightTrackerData_1.default />
      <hr />

      <div className="d-flex justify-content-around align-items-center h6">
        <DeleteGoalInfo_1.default clearGoal={clearGoal} clearGoalSaveWeights={clearGoalSaveWeights} clearFinish={clearFinish} className="mt-3"/>
      </div>
    </>);
};
var mapStateToProps = function (_a) {
    var data = _a.data;
    return ({
        userData: data
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setWeightData: function (data) { return dispatch(actions_1.setWeightData(data)); },
    setFinishDate: function (data) { return dispatch(actions_1.setFinishDate(data)); },
    setDailyWeight: function (data) { return dispatch(actions_1.setDailyWeight(data)); },
    clearActualGoal: function (data) { return dispatch(actions_1.clearActualGoal(data)); },
    clearActualGoalSaveWeights: function (data) { return dispatch(actions_1.clearActualGoalSaveWeights(data)); },
    clearFinishDateOnly: function (data) { return dispatch(actions_1.clearFinishDateOnly(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WeightTracker);
