import React from 'react';

import { MyTextField } from '../../util/Formik/FormikFunctions';

import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import { Button } from 'reactstrap';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const validationSchema = yup.object({
  displayName: yup
    .string()
    .min(2, 'Too short')
    .max(20, 'Too long')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required')
});

const SignUp: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          displayName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const { displayName, email, password } = data;

          try {
            // async?
            let { user }: any = auth.createUserWithEmailAndPassword(
              email,
              password
            );
            createUserProfileDocument(user, { displayName });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <>
            <p className='h3 text-center'>I do not have an account</p>
            <p className='h6 text-center my-3'>
              Sign up with your email and password
            </p>

            <Form className='w-100 d-flex flex-column justify-content-center'>
              <div className='p-2'>
                <MyTextField
                  type='text'
                  name='displayName'
                  placeholder='display name'
                  as={TextField}
                />
              </div>

              <div className='p-2'>
                <MyTextField
                  type='text'
                  name='email'
                  placeholder='email'
                  as={TextField}
                />
              </div>

              <div className='p-2'>
                <MyTextField
                  type='password'
                  name='password'
                  placeholder='password'
                  as={TextField}
                />
              </div>

              <div className='p-2'>
                <MyTextField
                  type='password'
                  name='confirmPassword'
                  placeholder='confirm password'
                  as={TextField}
                />
              </div>

              <Button
                type='submit'
                block
                className='d-flex justify-content-center my-3'
                color='primary'
              >
                Sign up
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
