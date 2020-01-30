import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import { MyTextField } from '../../util/Formik/FormikFunctions'
import DeleteGoal from '../../components/Info/DeleteGoal/DeleteGoal'
import Chart from '../../components/Chart/Chart'
import { setWeightData, setFinishDate, setDailyWeight, clearActualGoal } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeight, faBullseye } from '@fortawesome/free-solid-svg-icons'

const validationSchema = yup.object({
  weight: yup.number('It must be a number').required('Weight is required').positive(),
  weightGoal: yup.number('It must be a number').required('Weight is required').positive()
})

const WeightTracker = ({ currentUser, userData, setWeightData, setFinishDate, setDailyWeight, clearActualGoal }) => {
  const [date, setDate] = useState(null)

  const [daily, setDaily] = useState({
    dailyWeight: ''
  })

  const { dailyWeight } = daily
  const { weightGoal, finish, dailyWeightArray } = userData
  const weightToday = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null
  const weightYesterday = dailyWeightArray.length > 1 ? dailyWeightArray[dailyWeightArray.length - 2].weight : null

  let finishDate = new Date(date).toISOString().slice(0, 10)

  const handleChange = e => {
    const { name, value } = e.target
    setDaily({ [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setDailyWeight({
      weight: dailyWeight,
      date: new Date().toISOString().slice(0, 10)
    })

    setDaily({ dailyWeight: '' })
  }

  const clearFunc = () => {

    clearActualGoal({
      start: '',
      finish: '',
      weightGoal: '',
      dailyWeightArray: []
    })
  }

  return (
    <>
      <p className="h2 text-center">Weight Tracker</p>

      {!finish ? (
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
                    {weightGoal ? 'Change' : 'Add'}
                  </Button>
                </Form>
              </>
            )}
          </Formik>

          {weightGoal ? (
            <div className="d-flex justify-content-center align-items-center">
              <DatePicker
                className="my-2 mr-3 text-center border-0"
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
            </div>
          ) : null
          }
        </>
      ) : (
          <>
            <div className="w-100 mt-3 d-flex align-items-center">
              <p className="h5 w-50">Today`s weight</p>
              <form onSubmit={handleSubmit}>
                <TextField
                  className="w-50"
                  name="dailyWeight"
                  type="number"
                  step="0.1"
                  onChange={handleChange}
                  value={dailyWeight}
                  as={TextField}
                />
                <Button className="ml-3" type="submit" color="primary"
                >
                  Submit
              </Button>
              </form>
            </div>
            <div className="d-flex justify-content-center h5 my-4">
              {weightToday === weightYesterday ? (
                <p>Your weight is the same as yesterday</p>
              ) : (
                  dailyWeightArray.length >= 2 ? (
                    <p>Actual weight is {weightToday} kg,
                    which is {Math.abs(weightToday - weightYesterday)} kg {' '}
                      {weightToday - weightYesterday < 0 ? 'less' : 'more'} than yesterday.
                  </p>
                  ) : (
                      <p>Actual weight is {weightToday} kg</p>
                    )
                )}
            </div>
            {/* Week average, Info component about weight gain and loss,
            delete actual Goal and set new Goal, 
            TABS with Chart, History, separate reducer? */}

          </>
        )}
      <hr />
      <Chart />
      <hr />

      <div className="d-flex justify-content-around align-items-center h5">
        <DeleteGoal clearFunc={clearFunc} className="mt-3" />
      </div>
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
  setDailyWeight: data => dispatch(setDailyWeight(data)),
  clearActualGoal: data => dispatch(clearActualGoal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightTracker)