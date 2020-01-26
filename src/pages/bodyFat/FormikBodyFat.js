import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { MyTextField } from '../../util/Formik/FormikFunctions'

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo'
import { setFatData } from '../../redux/actions'
import { bodyFatFormula, idealBodyFatPercentage } from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


let localUserSize
JSON.parse(localStorage.getItem('userFatData')) === null ?
  localUserSize = '' : localUserSize = JSON.parse(localStorage.getItem('userFatData'))

const validationSchema = yup.object({
  waist: yup.number('It must be a number').required('Waist is required').positive(),
  hip: yup.number('It must be a number').required('Hip is required').positive(),
  neck: yup.number('It must be a number').required('Neck is required').positive()
})

const FormikBodyFat = ({ setFatData, currentUser, userData, history }) => {
  const [userSize, setUserSize] = useState({
    waist: '',
    hip: '',
    neck: '',
    fat: '',
    open: false
  })

  const { open } = userSize
  const { sex, height } = userData

  const bodyFat = bodyFatFormula(userSize, userData)
  const bodyFatMass = ((userData.weight * bodyFat) / 100).toFixed(2)
  const leanBodyMass = (userData.weight - bodyFatMass).toFixed(2)
  const bodyFatToLose = (bodyFat - idealBodyFatPercentage(userData)).toFixed(1)

  return (
    <div>
      <Formik initialValues={{
        waist: localUserSize.waist || '',
        hip: localUserSize.hip || '',
        neck: localUserSize.neck || '',
        fat: localUserSize.fat || ''
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          const actualData = {
            waist: data.waist,
            hip: data.hip,
            neck: data.neck,
            fat: bodyFatFormula(data, userData)
          }
          setUserSize({
            ...actualData,
            open: true
          })

          setFatData({
            ...actualData,
            userId: currentUser.id
          })
          localStorage.setItem('userFatData', JSON.stringify(actualData))
        }}
      >
        {({ isSubmitting }) => (
          <>
            <p className="h3 text-center">Body fat percentage</p>
            <hr />

            <Form className="w-100 d-flex flex-column justify-content-center">
              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 text-primary" icon={faCheck} size="2x" />
                <MyTextField type="number" name="waist" placeholder="Waist (cm)" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 text-primary" icon={faCheck} size="2x" />
                <MyTextField type="number" name="hip" placeholder="Hip (cm)" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <FontAwesomeIcon className="mr-3 text-primary" icon={faCheck} size="2x" />
                <MyTextField type="number" name="neck" placeholder="Neck (cm)" as={TextField} />
              </div>

              <Button disabled={isSubmitting} type='submit'
                block className="d-flex justify-content-center my-3" color="primary"
              >
                Calculate
                </Button>
            </Form>
          </>
        )}
      </Formik>

      <hr />
      <div className="w-100">
        {sex && height ? (
          open && bodyFat > 0 ? (
            <div>
              <div className="h3 mb-3 d-flex align-items-center justify-content-center">
                Your body fat is {bodyFat} %
                  <FatPercentageInfo />
              </div>
              <p className="h5 mb-3 text-center">Body fat mass: {bodyFatMass} kg</p>
              <p className="h5 mb-3 text-center">Lean body mass: {leanBodyMass} kg</p>
              <p className="h5 mb-3 text-center">Ideal body fat for given age: {idealBodyFatPercentage(userData)} %</p>

              {bodyFatToLose > 0 ? (
                <p className="h5 mb-3 text-center">Body fat to lose to reach ideal: {bodyFatToLose} %</p>) : (
                  <p className="h5 mb-3 text-center">You are below ideal fat percentage!</p>)}

              <div className="d-flex justify-content-center mt-4" color="primary">
                <Button onClick={() => history.push('/')}>
                  Go to home page
                </Button>
              </div>
            </div>
          ) : (open &&
            <p className="h6 mx-5 my-2 text-center text-danger">
              Make sure you entered your measurements correctly!
            </p>
            )
        ) : (
            <div className="h6 mx-5 my-2 text-center text-danger">
              Make sure you added information about your sex and height!
                <br /><br />
              This data are necessary to make calculations
              <div className="form__button">
                <Button color="danger"
                  onClick={() => history.push('/personalData')}>
                  Add data
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormikBodyFat)