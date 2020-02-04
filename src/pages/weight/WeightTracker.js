import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import moment from 'moment'

import { diffDays, weightTrackerInfo, percentageProgress, HealthTips } from '../../util/equations'
import { MyTextField } from '../../util/Formik/FormikFunctions'
import DeleteGoalInfo from '../../components/Info/DeleteGoalInfo/DeleteGoalInfo'
import WeightTrackerData from '../../components/Tabs/WeightTrackerData/WeightTrackerData'
import WeightInfo from '../../components/Info/WeightInfo/WeightInfo'
import HealthTipsInfo from '../../components/Info/HealthTipsInfo/HealthTipsInfo'
import WeightTodayFormik from '../../components/WeightTodayFormik/WeightTodayFormik'
import {
  setWeightData, setFinishDate, setDailyWeight,
  clearActualGoal, clearActualGoalSaveWeights, clearFinishDateOnly
} from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeight, faBullseye } from '@fortawesome/free-solid-svg-icons'

const validationSchema = yup.object({
  weight: yup.number('It must be a number').required('Weight is required').positive(),
  weightGoal: yup.number('It must be a number').required('Weight is required').positive()
})

const WeightTracker = ({
  userData,
  setWeightData,
  setFinishDate,
  setDailyWeight,
  clearActualGoal,
  clearActualGoalSaveWeights,
  clearFinishDateOnly
}) => {
  const [date, setDate] = useState(null)

  const { weightGoal, finish, dailyWeightArray } = userData
  const weightToday = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null
  const weightYesterday = dailyWeightArray.length > 1 ? dailyWeightArray[dailyWeightArray.length - 2].weight : null

  // if input in DatePicker is empty set finish date to 4 weeks from today
  let finishDate = (new Date(date).toISOString().slice(0, 10) === '1970-01-01')
    ? (moment().startOf('today').add(3, 'weeks')._d).toISOString().slice(0, 10)
    : new Date(date).toISOString().slice(0, 10)

  const [daysCompletionPercentage, kgCompletionPercentage] = percentageProgress(userData, diffDays)
  const healthTips = HealthTips(userData, diffDays)

  const clearGoal = () => {
    clearActualGoal({
      start: '',
      finish: '',
      weightGoal: '',
      dailyWeightArray: []
    })
  }

  const clearGoalSaveWeights = () => {
    clearActualGoalSaveWeights({
      start: '',
      finish: '',
      weightGoal: ''
    })
  }

  const clearFinish = () => {
    clearFinishDateOnly({
      finish: ''
    })
  }

  return (
    <>
      <p className="h2 text-center">Weight Tracker</p>

      {!finish ? (
        <>
          {/* Formik actual weight & weight goal */}
          <Formik initialValues={{
            weight: userData.weight || '',
            weightGoal: userData.weightGoal || '',
          }}
            validationSchema={validationSchema}
            onSubmit={data => {
              setWeightData({
                weight: data.weight,
                weightGoal: data.weightGoal
              })
              setDailyWeight({
                date: new Date().toISOString().slice(0, 10),
                weight: data.weight,
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

          {/* Set finish date - DatePicker */}
          {weightGoal && <div className="d-flex justify-content-center align-items-center">
            <DatePicker
              className="my-2 mr-3 text-center border-0"
              selected={date}
              onChange={date => setDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              minDate={moment().startOf('today').add(3, 'weeks')._d}
              required
            />
            <Button
              onClick={() => setFinishDate({
                finish: finishDate,
                start: new Date().toISOString().slice(0, 10)
              })}
              color="primary">
              Add
            </Button>
          </div>
          }
        </>
      ) : (
          <>
            {/* Set today`s weight */}
            <WeightTodayFormik
              setDailyWeight={setDailyWeight}
              userData={userData}
            />

            <div className="text-center h5 my-4">
              {weightToday === weightYesterday ? (
                <p>The same weight as yesterday</p>
              ) : (
                  dailyWeightArray.length >= 2 ? (
                    <p>
                      Actual weight <b>{(weightToday)}kg</b><br />
                      <b>{(Math.abs(weightToday - weightYesterday)).toFixed(1)}kg</b>
                      {weightToday - weightYesterday < 0 ? ' less' : ' more'} than yesterday
                    </p>
                  ) : (
                      <p>Actual weight {weightToday}kg</p>
                    )
                )}
            </div>
            <div className="text-center h5 my-4">
              <b>{(diffDays(finish))} days</b> left and <b>{weightTrackerInfo(userData)}</b>
            </div>

            <div className="d-flex justify-content-center">
              <HealthTipsInfo
                healthTips={healthTips}
                dailyWeightArray={dailyWeightArray}
                clearFinish={clearFinish}
              />
              <WeightInfo />
            </div>

            {/* Circular Progress */}
            <div className="d-flex my-1">
              <div className="text-center h5 my-2 mx-2 w-50">
                <p>Time progress</p>
                <CircularProgressbar
                  value={daysCompletionPercentage}
                  text={`${daysCompletionPercentage}%`}
                  circleRatio={0.75}
                  styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: "butt",
                    trailColor: "lightgray"
                  })}
                />
              </div>
              <div className="text-center h5 my-2 mx-2 w-50">
                <p>Weight progress</p>
                <CircularProgressbar
                  value={kgCompletionPercentage}
                  text={`${kgCompletionPercentage}%`}
                  circleRatio={0.75}
                  styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: "butt",
                    trailColor: "lightgray"
                  })}
                />
              </div>
            </div>

          </>
        )}

      <hr />
      <p className="h2 text-center mb-3">Weight Tracker data</p>

      <WeightTrackerData />
      <hr />

      <div className="d-flex justify-content-around align-items-center h6">
        <DeleteGoalInfo
          clearGoal={clearGoal}
          clearGoalSaveWeights={clearGoalSaveWeights}
          clearFinish={clearFinish}
          className="mt-3"
        />
      </div>
    </>
  )
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setWeightData: data => dispatch(setWeightData(data)),
  setFinishDate: data => dispatch(setFinishDate(data)),
  setDailyWeight: data => dispatch(setDailyWeight(data)),
  clearActualGoal: data => dispatch(clearActualGoal(data)),
  clearActualGoalSaveWeights: data => dispatch(clearActualGoalSaveWeights(data)),
  clearFinishDateOnly: data => dispatch(clearFinishDateOnly(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightTracker)