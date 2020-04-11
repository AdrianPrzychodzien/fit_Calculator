import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFormula, setHomeOpen } from '../../redux/actions';
import { MyRadioFormula } from '../../util/Formik/FormikFunctions';
import { Formik, Form } from 'formik';
import { Button } from 'reactstrap';

import {
  activityLevelComment,
  calcBMI,
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  restingMifflinStJeor,
  restingHarrisBenedict,
  restingKatchMcardle,
  trainingHeartRate,
  maxHeartRate
} from '../../util/equations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faUtensils,
  faBalanceScaleRight,
  faRunning,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons';

import { State, SetFormula } from '../../interfaces';

const Home: React.FC = ({ history }: any) => {
  const userData = useSelector((state: State) => state.data);
  const { homeOpen } = useSelector((state: State) => state.ui);
  const dispatch = useDispatch();

  const { weight, height, age, sex, lifeActivity, fat, formula } = userData;

  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData));

  return (
    <>
      <p className='h2 text-center'>Hello</p>
      <hr />

      {weight && height && age && sex && lifeActivity ? (
        <p className='text-center h6 my-4' style={{ lineHeight: '28px' }}>
          You are a <b>{userData.age}</b> year old{' '}
          <b>{userData.sex.toLowerCase()}</b> who is <b>{userData.height}cm</b>{' '}
          tall and weights <b>{userData.weight}kg</b> while{' '}
          <b>{activityLevelComment(userData.lifeActivity)}</b>
        </p>
      ) : (
        <>
          <p className='text-center'>
            Add your personal data and choose one of the following three
            equations to calculate basic indicators (Resting Metabolic Rate,
            Body Mass Index, Training Heart Rate or Heart Rate Max){' '}
          </p>
          <Button
            block
            className='text-center my-4'
            color='primary'
            onClick={() => history.push('/personalData')}
          >
            Add personal data
          </Button>{' '}
        </>
      )}

      <Formik
        initialValues={{
          formula: userData.formula || ''
        }}
        onSubmit={(data: SetFormula) => {
          dispatch(setFormula({ ...data }));
          !homeOpen && dispatch(setHomeOpen({ homeOpen: true }));
        }}
      >
        {() => (
          <>
            <Form>
              <div className='w-100 d-flex flex-wrap justify-content-center'>
                <div className='mx-auto d-flex flex-column'>
                  <MyRadioFormula
                    type='radio'
                    name='formula'
                    value='MifflinStJeor'
                    label='MifflinStJeor'
                  />
                </div>
                <div className='mx-auto d-flex flex-column'>
                  <MyRadioFormula
                    type='radio'
                    name='formula'
                    value='HarrisBenedict'
                    label='HarrisBenedict'
                  />
                </div>
                <div className='mx-auto d-flex flex-column'>
                  <MyRadioFormula
                    type='radio'
                    name='formula'
                    value='KatchMcardle'
                    label='KatchMcardle'
                  />
                </div>
              </div>
              <Button
                type='submit'
                block
                className='text-center my-2'
                color='primary'
              >
                Calculate
              </Button>
            </Form>
          </>
        )}
      </Formik>

      {homeOpen && weight && height && age && sex && lifeActivity ? (
        <div>
          <hr />
          {formula === 'KatchMcardle' && !fat && (
            <p className='h5 text-center text-danger'>
              Body fat percentage is required
              <Button
                color='danger'
                className='my-3'
                onClick={() => history.push('/bodyFat')}
              >
                click here to complete
              </Button>
            </p>
          )}
          <div className='w-100 d-flex justify-content-between my-2'>
            <div className='w-85 d-flex  '>
              <p className='w-20 d-flex '>
                <FontAwesomeIcon
                  className='text-primary'
                  icon={faBed}
                  size='2x'
                />
              </p>
              <p className='h5 ml-1'>Resting Metabolic Rate: </p>
            </div>
            <div className='h5 d-flex'>
              {formula === 'MifflinStJeor' ? (
                restingMifflinStJeor(userData)
              ) : formula === 'HarrisBenedict' ? (
                restingHarrisBenedict(userData)
              ) : fat ? (
                restingKatchMcardle(userData)
              ) : (
                <p className='h5 text-danger'>no data</p>
              )}
              {fat ? <p className='h5'> kcal</p> : null}
            </div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2'>
            <div
              onClick={() => history.push('/calories')}
              className='w-80 d-flex'
            >
              <p className='w-20 d-flex justify-content-center'>
                <FontAwesomeIcon
                  className='text-primary'
                  icon={faUtensils}
                  size='2x'
                />
              </p>
              <p className='h5 ml-3'>Caloric needs:</p>
            </div>
            <div className='h5 d-flex'>
              {formula === 'MifflinStJeor' ? (
                MifflinStJeor(userData)
              ) : formula === 'HarrisBenedict' ? (
                HarrisBenedict(userData)
              ) : fat ? (
                KatchMcardle(userData)
              ) : (
                <p className='h5 text-danger'>no data</p>
              )}
              {fat ? <p className='h5'> kcal</p> : null}
            </div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2'>
            <div onClick={() => history.push('/bmi')} className='w-80 d-flex'>
              <p className='w-20 d-flex '>
                <FontAwesomeIcon
                  className='text-primary'
                  icon={faBalanceScaleRight}
                  size='2x'
                />
              </p>
              <p className='h5 ml-1'>BMI:</p>
            </div>
            <div className='h5 d-flex'>{calcBMI(userData)}</div>
          </div>

          <div className='w-100 d-flex justify-content-between my-2 '>
            <div className='w-80 d-flex'>
              <p className='w-20 d-flex'>
                <FontAwesomeIcon
                  className='text-primary'
                  icon={faHeartbeat}
                  size='2x'
                />
              </p>
              <p className='h5 ml-2'>Maximum Heart Rate:</p>
            </div>
            <p className='h5 d-flex'>{maxHeartRate(userData)}</p>
          </div>

          <div className='w-100 d-flex justify-content-between my-2 '>
            <div className='w-80 d-flex'>
              <p className='w-20 d-flex'>
                <FontAwesomeIcon
                  className='text-primary'
                  icon={faRunning}
                  size='2x'
                />
              </p>
              <p className='h5 ml-3'>Training Heart Rate:</p>
            </div>
            <div className='h5 d-flex'>
              {trainingMin} - {trainingMax}
            </div>
          </div>
        </div>
      ) : (
        homeOpen && (
          <p className='h4 text-center text-danger my-4'>
            Complete data first!
          </p>
        )
      )}
    </>
  );
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

export default Home;
