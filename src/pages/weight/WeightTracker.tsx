import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from '@material-ui/core';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';
import { unitOfTime } from 'moment';

import {
  diffDays,
  weightTrackerInfo,
  percentageProgress,
  HealthTips
} from '../../util/equations';
import { MyTextField } from '../../util/Formik/FormikFunctions';
import DeleteGoalInfo from '../../components/Info/DeleteGoalInfo/DeleteGoalInfo';
import WeightTrackerData from '../../components/Tabs/WeightTrackerData/WeightTrackerData';
import WeightInfo from '../../components/Info/WeightInfo/WeightInfo';
import HealthTipsInfo from '../../components/Info/HealthTipsInfo/HealthTipsInfo';
import WeightTodayFormik from '../../components/WeightTodayFormik/WeightTodayFormik';
import {
  setWeightData,
  setFinishDate,
  setDailyWeight,
  clearActualGoal,
  clearActualGoalSaveWeights,
  clearFinishDateOnly
} from '../../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeight, faBullseye } from '@fortawesome/free-solid-svg-icons';

import { State, SetWeightDataInterface } from '../../interfaces/interfaces';

const validationSchema = yup.object({
  weight: yup.number().required('Weight is required').positive(),
  weightGoal: yup.number().required('Weight is required').positive()
});

const WeightTracker: React.FC = () => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());

  const { weightGoal, finish, dailyWeightArray } = userData;
  const weightToday = dailyWeightArray.length
    ? dailyWeightArray[dailyWeightArray.length - 1].weight
    : null;
  const weightYesterday =
    dailyWeightArray.length > 1
      ? dailyWeightArray[dailyWeightArray.length - 2].weight
      : null;

  // if input in DatePicker is empty set finish date to 4 weeks from today
  let period: string = 'today';
  let finishDate =
    new Date(date).toISOString().slice(0, 10) === '1970-01-01'
      ? moment()
          .startOf(period as unitOfTime.StartOf)
          .add(3, 'weeks')
          .toISOString()
          .slice(0, 10)
      : new Date(date).toISOString().slice(0, 10);

  const [daysCompletionPercentage, kgCompletionPercentage] = percentageProgress(
    userData,
    diffDays
  );
  const healthTips = HealthTips(userData, diffDays);

  const ThreeWeeksAfter = moment().add(3, 'weeks');
  const ThreeWeeksAfterDate = Object.values(ThreeWeeksAfter)[4];

  const clearGoal = () => {
    dispatch(
      clearActualGoal({
        start: '',
        finish: '',
        weightGoal: 0,
        dailyWeightArray: []
      })
    );
  };

  const clearGoalSaveWeights = () => {
    dispatch(
      clearActualGoalSaveWeights({
        start: '',
        finish: '',
        weightGoal: 0
      })
    );
  };

  const clearFinish = () => {
    dispatch(
      clearFinishDateOnly({
        finish: ''
      })
    );
  };

  return (
    <>
      <p className='h2 text-center'>Weight Tracker</p>

      {!finish ? (
        <>
          {/* Formik actual weight & weight goal */}
          <Formik
            initialValues={{
              weight: userData.weight || 0,
              weightGoal: userData.weightGoal || 0
            }}
            validationSchema={validationSchema}
            onSubmit={({ weight, weightGoal }: SetWeightDataInterface) => {
              dispatch(
                setWeightData({
                  weight: weight,
                  weightGoal: weightGoal
                })
              );
              dispatch(
                setDailyWeight({
                  date: new Date().toISOString().slice(0, 10),
                  weight: weight
                })
              );
            }}
          >
            {({ isSubmitting }: any) => (
              <>
                <Form className='w-100 d-flex justify-content-center'>
                  <div className='mx-3 my-3 w-50 d-flex'>
                    <FontAwesomeIcon
                      className='mr-3 text-primary'
                      icon={faWeight}
                      size='2x'
                    />
                    <MyTextField
                      type='number'
                      name='weight'
                      placeholder='Weight'
                      as={TextField}
                    />
                  </div>
                  <div className='mx-3 my-3 w-50 d-flex'>
                    <FontAwesomeIcon
                      className='mr-3 text-primary'
                      icon={faBullseye}
                      size='2x'
                    />
                    <MyTextField
                      type='number'
                      name='weightGoal'
                      placeholder='Goal'
                      as={TextField}
                    />
                  </div>

                  <Button
                    className='mx-1 my-2 h-25'
                    type='submit'
                    color='primary'
                  >
                    {weightGoal ? 'Change' : 'Add'}
                  </Button>
                </Form>
              </>
            )}
          </Formik>

          {/* Set finish date - DatePicker */}
          {weightGoal && (
            <div className='d-flex justify-content-center align-items-center'>
              <DatePicker
                className='my-2 mr-3 text-center border-0'
                selected={date}
                onChange={(date: any) => date && setDate(date)}
                dateFormat='dd/MM/yyyy'
                placeholderText='Select a date'
                minDate={ThreeWeeksAfterDate}
                // moment()
                //   .startOf(period as unitOfTime.StartOf)
                //   .add(3, 'weeks')._d

                required
              />
              <Button
                onClick={() =>
                  dispatch(
                    setFinishDate({
                      finish: finishDate,
                      start: new Date().toISOString().slice(0, 10)
                    })
                  )
                }
                color='primary'
              >
                Add
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Set today`s weight */}
          <WeightTodayFormik />

          <div className='text-center h5 my-4'>
            {weightToday === weightYesterday ? (
              <p>The same weight as yesterday</p>
            ) : dailyWeightArray.length >= 2 ? (
              <p>
                Actual weight <b>{weightToday}kg</b>
                <br />
                <b>{Math.abs(weightToday! - weightYesterday!).toFixed(1)}kg</b>
                {weightToday! - weightYesterday! < 0 ? ' less' : ' more'} than
                yesterday
              </p>
            ) : (
              <p>Actual weight {weightToday}kg</p>
            )}
          </div>
          <div className='text-center h5 my-4'>
            <b>{diffDays(finish)} days</b> left and{' '}
            <b>{weightTrackerInfo(userData)}</b>
          </div>

          <div className='d-flex justify-content-center'>
            <HealthTipsInfo
              healthTips={healthTips}
              dailyWeightArray={dailyWeightArray}
              clearFinish={clearFinish}
            />
            <WeightInfo />
          </div>

          {/* Circular Progress */}
          <div className='d-flex my-1'>
            <div className='text-center h5 my-2 mx-2 w-50'>
              <p>Time progress</p>
              <CircularProgressbar
                value={daysCompletionPercentage}
                text={`${daysCompletionPercentage}%`}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: 'butt',
                  trailColor: 'lightgray'
                })}
              />
            </div>
            <div className='text-center h5 my-2 mx-2 w-50'>
              <p>Weight progress</p>
              <CircularProgressbar
                value={kgCompletionPercentage}
                text={`${kgCompletionPercentage}%`}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: 'butt',
                  trailColor: 'lightgray'
                })}
              />
            </div>
          </div>
        </>
      )}

      <hr />
      <p className='h2 text-center mb-3'>Weight Tracker data</p>

      <WeightTrackerData />
      <hr />

      <div className='d-flex justify-content-around align-items-center h6'>
        <DeleteGoalInfo
          clearGoal={clearGoal}
          clearGoalSaveWeights={clearGoalSaveWeights}
          clearFinish={clearFinish}
          className='mt-3'
        />
      </div>
    </>
  );
};

export default WeightTracker;
