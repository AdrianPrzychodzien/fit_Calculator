import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from '@material-ui/core';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { MyTextField } from '../../util/Formik/FormikFunctions';

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo';
import { setFatData, setBodyFatCircum } from '../../redux/actions';
import { bodyFatFormula, idealBodyFatPercentage } from '../../util/equations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { State, SetBodyFatCircumInterface } from '../../interfaces/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

interface Props extends RouteComponentProps {
  history: History;
}

const validationSchema = yup.object({
  waist: yup.number().required('Waist is required').positive(),
  hips: yup.number().required('Hips are required').positive(),
  neck: yup.number().required('Neck is required').positive()
});

const BodyFat: React.FC<Props> = ({ history }) => {
  const userData = useSelector((state: State) => state.data);
  const circumData = useSelector((state: State) => state.circum);
  const dispatch = useDispatch();

  const [userSize, setUserSize] = useState({
    open: false
  });

  const { open } = userSize;
  const { sex, height, weight } = userData;

  const bodyFat = bodyFatFormula(circumData, userData);
  const bodyFatMass = ((weight * bodyFat) / 100).toFixed(2);
  const leanBodyMass = (weight - +bodyFatMass).toFixed(2);
  const bodyFatToLose = (bodyFat - +idealBodyFatPercentage(userData)).toFixed(
    1
  );

  return (
    <div>
      <Formik
        initialValues={{
          waist: circumData.waist || 0,
          hips: circumData.hips || 0,
          neck: circumData.neck || 0,
          fat: userData.fat || 0
        }}
        validationSchema={validationSchema}
        onSubmit={({ waist, hips, neck }: SetBodyFatCircumInterface) => {
          setUserSize({
            open: true
          });
          dispatch(
            setBodyFatCircum({
              waist: waist,
              hips: hips,
              neck: neck
            })
          );
          dispatch(
            setFatData({
              fat: bodyFat
            })
          );
        }}
      >
        {({ isSubmitting }) => (
          <>
            <p className='h3 text-center'>Body fat percentage</p>
            <hr />

            <Form className='w-100 d-flex flex-column justify-content-center'>
              <div className='mx-auto my-3 w-50 d-flex'>
                <FontAwesomeIcon
                  className='mr-3 text-primary'
                  icon={faCheck}
                  size='2x'
                />
                <MyTextField
                  type='number'
                  name='waist'
                  placeholder='Waist (cm)'
                  as={TextField}
                />
              </div>

              <div className='mx-auto my-3 w-50 d-flex'>
                <FontAwesomeIcon
                  className='mr-3 text-primary'
                  icon={faCheck}
                  size='2x'
                />
                <MyTextField
                  type='number'
                  name='hips'
                  placeholder='Hips (cm)'
                  as={TextField}
                />
              </div>

              <div className='mx-auto my-3 w-50 d-flex'>
                <FontAwesomeIcon
                  className='mr-3 text-primary'
                  icon={faCheck}
                  size='2x'
                />
                <MyTextField
                  type='number'
                  name='neck'
                  placeholder='Neck (cm)'
                  as={TextField}
                />
              </div>

              <Button
                disabled={isSubmitting}
                type='submit'
                block
                className='d-flex justify-content-center my-3'
                color='primary'
              >
                Calculate
              </Button>
            </Form>
          </>
        )}
      </Formik>

      <hr />
      <div className='w-100'>
        {sex && height ? (
          open && bodyFat > 0 ? (
            <div>
              <div className='h3 mb-3 d-flex align-items-center justify-content-center'>
                Body fat: {bodyFat}%
                <FatPercentageInfo />
              </div>
              <p className='h5 mb-3 text-center'>
                Body fat mass: {bodyFatMass} kg
              </p>
              <p className='h5 mb-3 text-center'>
                Lean body mass: {leanBodyMass} kg
              </p>
              <p className='h5 mb-3 text-center'>
                Ideal body fat for given age: {idealBodyFatPercentage(userData)}{' '}
                %
              </p>

              {+bodyFatToLose > 0 ? (
                <p className='h5 mb-3 text-center'>
                  Body fat to lose to reach ideal: {bodyFatToLose} %
                </p>
              ) : (
                <p className='h5 mb-3 text-center'>
                  You are below ideal fat percentage!
                </p>
              )}

              <div
                className='d-flex justify-content-center mt-4'
                color='primary'
              >
                <Button
                  block
                  className='d-flex justify-content-center my-3'
                  color='primary'
                  onClick={() => history.push('/')}
                >
                  Go to home page
                </Button>
              </div>
            </div>
          ) : (
            open && (
              <p className='h6 mx-5 my-2 text-center text-danger'>
                Make sure you entered your measurements correctly!
              </p>
            )
          )
        ) : (
          <div className='h6 mx-5 my-2 text-center text-danger'>
            Make sure you added information about your sex and height!
            <br />
            <br />
            This data are necessary to make calculations
            <div className='form__button'>
              <Button
                className='my-3'
                color='danger'
                onClick={() => history.push('/personalData')}
              >
                Add data
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyFat;
