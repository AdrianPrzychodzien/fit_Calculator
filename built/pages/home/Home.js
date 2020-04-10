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
var actions_1 = require("../../redux/actions");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var formik_1 = require("formik");
var reactstrap_1 = require("reactstrap");
var equations_1 = require("../../util/equations");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Home = function (_a) {
    var userData = _a.userData, uiData = _a.uiData, setFormula = _a.setFormula, setHomeOpen = _a.setHomeOpen, history = _a.history;
    var homeOpen = uiData.homeOpen;
    var weight = userData.weight, height = userData.height, age = userData.age, sex = userData.sex, lifeActivity = userData.lifeActivity, fat = userData.fat, formula = userData.formula;
    var _b = equations_1.trainingHeartRate(equations_1.maxHeartRate(userData)), trainingMin = _b[0], trainingMax = _b[1];
    return (<>
      <p className='h2 text-center'>Hello</p>
      <hr />

      {weight && height && age && sex && lifeActivity ? (<p className='text-center h6 my-4' style={{ lineHeight: '28px' }}>
          You are a <b>{userData.age}</b> year old{' '}
          <b>{userData.sex.toLowerCase()}</b> who is <b>{userData.height}cm</b>{' '}
          tall and weights <b>{userData.weight}kg</b> while{' '}
          <b>{equations_1.activityLevelComment(userData.lifeActivity)}</b>
        </p>) : (<>
            <p className='text-center'>
              Add your personal data and choose one of the following three
              equations to calculate basic indicators (Resting Metabolic Rate,
            Body Mass Index, Training Heart Rate or Heart Rate Max){' '}
            </p>
            <reactstrap_1.Button block className='text-center my-4' color='primary' onClick={function () { return history.push('/personalData'); }}>
              Add personal data
          </reactstrap_1.Button>{' '}
          </>)}

      <formik_1.Formik initialValues={{
        formula: userData.formula || ''
    }} onSubmit={function (data) {
        console.log(data);
        setFormula(__assign({}, data));
        !homeOpen && setHomeOpen(true);
    }}>
        {function () { return (<>
            <formik_1.Form>
              <div className='w-100 d-flex flex-wrap justify-content-center'>
                <div className='mx-auto d-flex flex-column'>
                  <FormikFunctions_1.MyRadioFormula type='radio' name='formula' value='MifflinStJeor' label='MifflinStJeor'/>
                </div>
                <div className='mx-auto d-flex flex-column'>
                  <FormikFunctions_1.MyRadioFormula type='radio' name='formula' value='HarrisBenedict' label='HarrisBenedict'/>
                </div>
                <div className='mx-auto d-flex flex-column'>
                  <FormikFunctions_1.MyRadioFormula type='radio' name='formula' value='KatchMcardle' label='KatchMcardle'/>
                </div>
              </div>
              <reactstrap_1.Button type='submit' block className='text-center my-2' color='primary'>
                Calculate
              </reactstrap_1.Button>
            </formik_1.Form>
          </>); }}
      </formik_1.Formik>

      {homeOpen && weight && height && age && sex && lifeActivity ? (<div>
          <hr />
          {formula === 'KatchMcardle' && !fat && (<p className='h5 text-center text-danger'>
              Body fat percentage is required
              <reactstrap_1.Button color='danger' className='my-3' onClick={function () { return history.push('/bodyFat'); }}>
                click here to complete
              </reactstrap_1.Button>
            </p>)}
          <div className='w-100 d-flex justify-content-between my-2'>
            <div className='w-85 d-flex  '>
              <p className='w-20 d-flex '>
                <react_fontawesome_1.FontAwesomeIcon className='text-primary' icon={free_solid_svg_icons_1.faBed} size='2x'/>
              </p>
              <p className='h5 ml-1'>Resting Metabolic Rate: </p>
            </div>
            <div className='h5 d-flex'>
              {formula === 'MifflinStJeor' ? (equations_1.restingMifflinStJeor(userData)) : formula === 'HarrisBenedict' ? (equations_1.restingHarrisBenedict(userData)) : fat ? (equations_1.restingKatchMcardle(userData)) : (<p className='h5 text-danger'>no data</p>)}
              {fat ? <p className='h5'> kcal</p> : null}
            </div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2'>
            <div onClick={function () { return history.push('/calories'); }} className='w-80 d-flex'>
              <p className='w-20 d-flex justify-content-center'>
                <react_fontawesome_1.FontAwesomeIcon className='text-primary' icon={free_solid_svg_icons_1.faUtensils} size='2x'/>
              </p>
              <p className='h5 ml-3'>Caloric needs:</p>
            </div>
            <div className='h5 d-flex'>
              {formula === 'MifflinStJeor' ? (equations_1.MifflinStJeor(userData)) : formula === 'HarrisBenedict' ? (equations_1.HarrisBenedict(userData)) : fat ? (equations_1.KatchMcardle(userData)) : (<p className='h5 text-danger'>no data</p>)}
              {fat ? <p className='h5'> kcal</p> : null}
            </div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2'>
            <div onClick={function () { return history.push('/bmi'); }} className='w-80 d-flex'>
              <p className='w-20 d-flex '>
                <react_fontawesome_1.FontAwesomeIcon className='text-primary' icon={free_solid_svg_icons_1.faBalanceScaleRight} size='2x'/>
              </p>
              <p className='h5 ml-1'>BMI:</p>
            </div>
            <div className='h5 d-flex'>{equations_1.calcBMI(userData)}</div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2 '>
            <div className='w-80 d-flex'>
              <p className='w-20 d-flex'>
                <react_fontawesome_1.FontAwesomeIcon className='text-primary' icon={free_solid_svg_icons_1.faHeartbeat} size='2x'/>
              </p>
              <p className='h5 ml-2'>Maximum Heart Rate:</p>
            </div>
            <p className='h5 d-flex'>{equations_1.maxHeartRate(userData)}</p>
          </div>

          <div className='w-100 d-flex justify-content-between my-2 '>
            <div className='w-80 d-flex'>
              <p className='w-20 d-flex'>
                <react_fontawesome_1.FontAwesomeIcon className='text-primary' icon={free_solid_svg_icons_1.faRunning} size='2x'/>
              </p>
              <p className='h5 ml-3'>Training Heart Rate:</p>
            </div>
            <div className='h5 d-flex'>
              {trainingMin} - {trainingMax}
            </div>
          </div>
        </div>) : (homeOpen && (<p className='h4 text-center text-danger my-4'>
              Complete data first!
            </p>))}
    </>);
};
// else {
//   return (
//     <div className="h2 text-center">
//       <br />
//       <p className="text-center">
//         Login in first, please!
//     </p>
//       <Button onClick={() => history.push('/signin')}
//         block className="d-flex justify-content-center my-5" color="primary">
//         Go to login page
//     </Button>
//     </div>
//   )
// }
// }
var mapStateToProps = function (_a) {
    var data = _a.data, ui = _a.ui;
    return ({
        userData: data,
        uiData: ui
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    setFormula: function (data) { return dispatch(actions_1.setFormula(data)); },
    setHomeOpen: function (data) { return dispatch(actions_1.setHomeOpen(data)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Home);
