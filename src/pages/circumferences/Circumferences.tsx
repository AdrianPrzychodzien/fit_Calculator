import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MyTextField } from '../../util/Formik/FormikFunctions';
import {
  myDateFormat,
  diffDays,
  circumferencesChange,
  biggestCircumChange
} from '../../util/equations';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import moment from 'moment';
import { unitOfTime } from 'moment';

import { setCircumferences, setBodyFatCircum } from '../../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';

import { State } from '../../interfaces';

const validationSchema = yup.object({
  waist: yup.number().required('Waist is required').positive(),
  hips: yup.number().required('Hips are required').positive(),
  neck: yup.number().required('Neck is required').positive(),
  chest: yup.number().required('Chest is required').positive(),
  shoulders: yup.number().required('Shoulders is required').positive(),
  thighs: yup.number().required('Thighs are required').positive(),
  biceps: yup.number().required('Biceps are required').positive()
});

const Circumferences = () => {
  // const userData = useSelector((state: State) => state.data);
  const { circumferences } = useSelector((state: State) => state.circum);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const circumIsEmpty = circumferences.length < 1;

  let firstUpdate;
  let lastUpdate;
  let nextUpdate;
  if (circumferences[0]) {
    firstUpdate = moment(circumferences[0].date).format('YYYY-MM-DD');
    lastUpdate = moment(circumferences[circumferences.length - 1].date).format(
      'YYYY-MM-DD'
    );
    nextUpdate = moment(lastUpdate)
      .startOf(lastUpdate as unitOfTime.StartOf)
      .add(1, 'weeks')
      .format('YYYY-MM-DD');
  }

  const arrayOfCircumferences =
    circumferences[0] && circumferencesChange(circumferences);
  const descendingList =
    circumferences[0] && biggestCircumChange(arrayOfCircumferences, 'desc');
  // const ascendingList = biggestCircumChange(arrayOfCircumferences, 'asc')

  return (
    <div>
      <p className='h2 text-center'>Body circumferences</p>
      <hr />

      <div className='h6 w-100'>
        <div className='d-flex'>
          <p className='w-50 text-center mt-1 mb-3'>
            Last update: <br /> {myDateFormat(lastUpdate)}
          </p>
          <p className='w-50 text-center mt-1 mb-3'>
            Next update: <br /> {myDateFormat(nextUpdate)}
          </p>
        </div>
        <Button
          size='sm'
          color='primary'
          onClick={toggle}
          style={{ marginBottom: '1rem' }}
        >
          <FontAwesomeIcon icon={faPencilRuler} className='mr-2' />
          Update measurements
        </Button>

        {/* Collapse with Formik (measurements) */}
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  waist: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].waist || 0,
                  hips: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].hips || 0,
                  neck: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].neck || 0,
                  chest: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].chest,
                  shoulders: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].shoulders,
                  thighs: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].thighs,
                  biceps: circumIsEmpty
                    ? 0
                    : circumferences[circumferences.length - 1].biceps
                }}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                  dispatch(
                    setCircumferences({
                      date: new Date('2020-03-03').toISOString().slice(0, 10),
                      waist: data.waist,
                      hips: data.hips,
                      neck: data.neck,
                      chest: data.chest,
                      shoulders: data.shoulders,
                      thighs: data.thighs,
                      biceps: data.biceps
                    })
                  );
                  dispatch(
                    setBodyFatCircum({
                      waist: data.waist,
                      hips: data.hips,
                      neck: data.neck
                    })
                  );
                }}
              >
                {({ isSubmitting }) => (
                  <>
                    <Form className='w-100 d-flex flex-column justify-content-center'>
                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Waist</p>
                        <MyTextField
                          placeholder='waist'
                          type='number'
                          name='waist'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Hips</p>
                        <MyTextField
                          placeholder='hips'
                          type='number'
                          name='hips'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Neck</p>
                        <MyTextField
                          placeholder='neck'
                          type='number'
                          name='neck'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Chest</p>
                        <MyTextField
                          placeholder='chest'
                          type='number'
                          name='chest'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Shoulders</p>
                        <MyTextField
                          placeholder='shoulders'
                          type='number'
                          name='shoulders'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Thighs</p>
                        <MyTextField
                          placeholder='thighs'
                          type='number'
                          name='thighs'
                          as={TextField}
                        />
                      </div>

                      <div className='mx-auto my-1 w-50 d-flex'>
                        <p className='h5 mr-2 mb-0 mt-1'>Biceps</p>
                        <MyTextField
                          placeholder='biceps'
                          type='number'
                          name='biceps'
                          as={TextField}
                        />
                      </div>

                      <Button
                        type='submit'
                        block
                        className='d-flex justify-content-center my-3'
                        color='primary'
                      >
                        Add measurements
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {circumferences[0] && (
        <>
          <p className='h5'>
            {diffDays(firstUpdate)} days have passed since first measurement
          </p>
          <p className='h5'>The biggest change occured in ..., ...cm</p>
          <p>
            Descending list of circums: 1. {descendingList[0].name}:{' '}
            {descendingList[0].value}
          </p>
          <p>
            Descending list of circums: 2. {descendingList[1].name}:{' '}
            {descendingList[1].value}
          </p>
          <p>
            Descending list of circums: 3. {descendingList[2].name}:{' '}
            {descendingList[2].value}
          </p>
        </>
      )}
    </div>
  );
};

export default Circumferences;
