import React from 'react'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import moment from 'moment'

import { MyTextField } from '../../util/Formik/FormikFunctions'

const validationSchema = yup.object({
  dailyWeight: yup.number('It must be a number').required('Weight is required').positive(),
})

const WeightTodayFormik = ({ setDailyWeight, userData }) => {
  const { dailyWeightArray } = userData

  const today = moment().toISOString().slice(0, 10)
  // const tomorrow = moment().add(1, 'days').toISOString().slice(0, 10)
  const lastWeightData = dailyWeightArray[dailyWeightArray.length - 1].date
  const theSameDay = moment(today).isSame(lastWeightData)

  return (
    <Formik initialValues={{
      dailyWeight: theSameDay ? (userData.weight || '') : '',
    }}
      validationSchema={validationSchema}
      onSubmit={data => {
        setDailyWeight({
          date: new Date().toISOString().slice(0, 10),
          weight: data.dailyWeight
        })
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form className="w-100 my-4 d-flex align-items-center">
            <p className="h5 w-50">Weight today</p>
            <div className="mx-3 my-3 w-50 d-flex">
              <MyTextField
                type="number"
                name="dailyWeight"
                placeholder={theSameDay ? "" : "Complete"}
                as={TextField}
              />
            </div>

            <Button className="ml-3" type='submit' color="primary">
              Submit
            </Button>
          </Form>
        </>
      )}
    </Formik>
  )
}

export default WeightTodayFormik