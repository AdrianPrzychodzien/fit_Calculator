import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from '@material-ui/core';
import { Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { setDailyWeight } from '../../redux/actions';
import { MyTextField } from '../../util/Formik/FormikFunctions';
import { State, SetDailyWeightInterface } from '../../interfaces/interfaces';

const validationSchema = yup.object({
  weight: yup.number().required('Weight is required').positive()
});

const WeightTodayFormik: React.FC = () => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();
  const { dailyWeightArray } = userData;

  const today = moment().toISOString().slice(0, 10);
  // const tomorrow = moment().add(1, 'days').toISOString().slice(0, 10)
  const lastWeightData = dailyWeightArray[dailyWeightArray.length - 1].date;
  const theSameDay = moment(today).isSame(lastWeightData);

  return (
    <Formik
      initialValues={{
        weight: theSameDay ? userData.weight : 0,
        date: new Date().toISOString().slice(0, 10)
      }}
      validationSchema={validationSchema}
      onSubmit={({ date, weight }: SetDailyWeightInterface) => {
        dispatch(setDailyWeight({ date, weight }));
      }}
    >
      {({ isSubmitting, submitForm }: any) => (
        <Form className='w-100 my-4 d-flex align-items-center'>
          <p className='h5 w-50'>Weight today</p>
          <div className='mx-3 my-3 w-50 d-flex'>
            <MyTextField
              type='number'
              name='weight'
              placeholder={theSameDay ? '' : 'Complete'}
              as={TextField}
            />
          </div>

          <Button className='ml-3' type='submit' color='primary'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WeightTodayFormik;
