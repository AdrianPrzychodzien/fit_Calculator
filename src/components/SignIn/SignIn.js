import React from 'react'

import { MyTextField } from '../../util/Formik/FormikFunctions'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
})

const SignIn = () => {

  return (
    <div>
      <Formik initialValues={{
        email: '',
        password: ''
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          const { email, password } = data

          try { // async?
            auth.signInWithEmailAndPassword(email, password)
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {() => (
          <>
            <p className="h3 text-center">I already have an account</p>
            <p className="h6 text-center my-3">Sign in with your email and password</p>

            <Form className="w-100 d-flex flex-column justify-content-center">
              <div className="p-2">
                <MyTextField type="text" name="email" placeholder="email" as={TextField} />
              </div>

              <div className="p-2">
                <MyTextField type="text" name="password" placeholder="password" as={TextField} />
              </div>

              <div className="d-flex justify-content-between my-3 w-100">
                <Button type='submit'
                  block className="text-center w-50 mr-2" color="primary"
                >
                  Sign in
              </Button>
                <Button className="text-center w-50 ml-2" onClick={signInWithGoogle}>
                  Sign in with Google
              </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default SignIn