import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import {
  MyRadio,
  MyTextField,
  StarsInput
} from '../../util/Formik/FormikFunctions';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { TextField } from '@material-ui/core';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake,
  faArrowsAltV,
  faFemale,
  faMale,
  faWeight,
  faPercentage
} from '@fortawesome/free-solid-svg-icons';
import { State, SetUserDataInterface } from '../../interfaces';
import BodyFatInfo from '../../components/Info/BodyFatInfo/BodyFatInfo';
import { setData, setDailyWeight } from '../../redux/actions';

const validationSchema = yup.object({
  height: yup.number().required('Height is required').positive(),
  weight: yup.number().required('Weight is required').positive(),
  age: yup.number().required('Age is required').positive(),
  fat: yup.number().positive().max(70, 'Are you sure?')
});

interface Props extends RouteComponentProps<any> {
  history: any;
}

const PersonalData: React.FC<Props> = ({ history }: any) => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        height: userData.height || 0,
        weight: userData.weight || 0,
        age: userData.age || 0,
        fat: userData.fat || userData.fat || 0,
        sex: userData.sex || 'Male',
        lifeActivity: userData.lifeActivity || 1
      }}
      validationSchema={validationSchema}
      onSubmit={({
        height,
        weight,
        age,
        fat,
        sex,
        lifeActivity
      }: SetUserDataInterface) => {
        dispatch(setData({ height, weight, age, fat, sex, lifeActivity }));

        dispatch(
          setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: weight
          })
        );

        history.push('/');
      }}
    >
      {({ isSubmitting }: any) => (
        <>
          <p className='h3 text-center'>Add your personal data</p>
          <hr />

          <Form className='w-100 d-flex flex-column justify-content-center'>
            <div className='mx-auto my-3 w-50 d-flex'>
              <FontAwesomeIcon
                className='mr-4 ml-2 text-primary'
                icon={faArrowsAltV}
                size='2x'
              />
              <MyTextField
                type='number'
                name='height'
                placeholder='Height (cm)'
                as={TextField}
              />
            </div>

            <div className='mx-auto my-3 w-50 d-flex'>
              <FontAwesomeIcon
                className='mr-3 text-primary'
                icon={faWeight}
                size='2x'
              />
              <MyTextField
                type='number'
                name='weight'
                placeholder='Weight (kg)'
                as={TextField}
              />
            </div>

            <div className='mx-auto my-3 w-50 d-flex'>
              <FontAwesomeIcon
                className='mr-3 ml-1 text-primary'
                icon={faBirthdayCake}
                size='2x'
              />
              <MyTextField
                type='number'
                name='age'
                placeholder='Age'
                as={TextField}
              />
            </div>

            <div className='mx-auto my-3 w-50 d-flex'>
              <FontAwesomeIcon
                className='mr-3 ml-1 text-primary'
                icon={faPercentage}
                size='2x'
              />
              <MyTextField
                type='number'
                name='fat'
                placeholder='Body fat %'
                as={TextField}
              />
              <BodyFatInfo />
            </div>

            <div className='mx-auto my-2 w-80 d-flex'>
              <div>
                <FontAwesomeIcon
                  className='mr-2 text-primary'
                  icon={faMale}
                  size='2x'
                />
                <MyRadio type='radio' name='sex' value='Male' label='Male' />
              </div>
              <div>
                <FontAwesomeIcon
                  className='mr-2 text-primary'
                  icon={faFemale}
                  size='2x'
                />
                <MyRadio
                  type='radio'
                  name='sex'
                  value='Female'
                  label='Female'
                />
              </div>
            </div>

            <div className='mx-auto my-1 w-100 d-flex justify-content-center'>
              <StarsInput fieldName={'lifeActivity'} />
            </div>

            <Button
              disabled={isSubmitting}
              type='submit'
              block
              className='d-flex justify-content-center my-3'
              color='primary'
            >
              Add data
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default PersonalData;
