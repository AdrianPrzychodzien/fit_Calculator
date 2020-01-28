import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import { MyTextField } from '../../util/Formik/FormikFunctions'
import Chart from '../../components/Chart/Chart'
import { setWeightData, setFinishDate, setDailyWeight } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeight, faBullseye } from '@fortawesome/free-solid-svg-icons'

const validationSchema = yup.object({
  weight: yup.number('It must be a number').required('Weight is required').positive(),
})

const WeightTracker = ({ currentUser, userData, setWeightData, setFinishDate, setDailyWeight }) => {
  const [date, setDate] = useState(null)

  const { dailyWeight, weight, weightGoal } = userData

  let finishDate = new Date(date).toISOString().slice(0, 10)

  return (
    <>
      <p className="h2 text-center">Weight Tracker</p>

      {userData.finish ? (
        <>
          <>
            <Formik initialValues={{
              weight: userData.weight || '',
              weightGoal: userData.weightGoal || '',
            }}
              validationSchema={validationSchema}
              onSubmit={data => {
                setWeightData({
                  weight: data.weight,
                  weightGoal: data.weightGoal,
                  userId: currentUser.id
                })
              }}
            >
              {({ isSubmitting }) => (
                <>
                  <Form className="w-100 d-flex justify-content-center">
                    <div className="mx-3 my-3 w-50 d-flex">
                      <FontAwesomeIcon className="mr-3 text-primary" icon={faWeight} size="2x" />
                      <MyTextField type="number" name="weight" placeholder="Weight" as={TextField} />
                    </div>
                    <div className="mx-3 my-3 w-50 d-flex">
                      <FontAwesomeIcon className="mr-3 text-primary" icon={faBullseye} size="2x" />
                      <MyTextField type="number" name="weightGoal" placeholder="Goal" as={TextField} />
                    </div>

                    <Button className="mx-1 my-2 h-25" type='submit' color="primary">
                      Add
                    </Button>
                  </Form>
                </>
              )}
            </Formik>

            <DatePicker
              className="mt-2"
              selected={date}
              onChange={date => setDate(date)}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
            />
            <Button onClick={() => setFinishDate({ finish: finishDate, start: new Date().toISOString().slice(0, 10) })}
              className="" color="primary">
              Add
            </Button>
          </>

        </>
      ) : (
          <>
            <TextField name="daily" type="number" as={TextField} />
            <Button color="primary">submit</Button>
          </>
        )}


      <hr />
      <Chart />
    </>
  )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setWeightData: data => dispatch(setWeightData(data)),
  setFinishDate: data => dispatch(setFinishDate(data)),
  setDailyWeight: data => dispatch(setDailyWeight(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightTracker)