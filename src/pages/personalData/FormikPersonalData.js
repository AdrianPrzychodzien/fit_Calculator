import React from 'react'

import { MyRadio, MyTextField, StarsInput } from '../../util/Formik/FormikFunctions'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextField, Button } from '@material-ui/core'

import { setData, setFatPercentage } from '../../redux/actions'



const validationSchema = yup.object({
  height: yup.number().required().max(220)
})

const FormikPersonalData = () => {
  return (
    <div>
      <Formik initialValues={{
        height: '',
        weight: '',
        age: '',
        fat: '',
        sex: '',
        lifeActivity: 1
      }}
        validationSchema={validationSchema}
        // validate={(values) => {
        //   const errors = {}

        //   if (values.height.length < 3) {
        //     errors.height = 'You are too short'
        //   }

        //   return errors
        // }}
        onSubmit={data => {
          setData({
            data
            // userId: currentUser.id
          })
          console.log(data)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField type="number" name="height" placeholder="Height (cm)" as={TextField} />
            <MyTextField type="number" name="weight" placeholder="Weight (kg)" as={TextField} />
            <MyTextField type="number" name="age" placeholder="Age" as={TextField} />
            <MyTextField type="number" name="fat" placeholder="BodyFat %" as={TextField} />
            <br />
            <MyRadio type="radio" name="sex" value="Male" label="Male" />
            <MyRadio type="radio" name="sex" value="Female" label="Female" />
            <br />
            <StarsInput fieldName={'lifeActivity'} />
            <br />
            <Button disabled={isSubmitting} type='submit'>add data</Button>
          </Form>
        )}
      </Formik>
    </div>
    // <p className="h3 text-center">Add your personal data</p>
  )
}

export default FormikPersonalData