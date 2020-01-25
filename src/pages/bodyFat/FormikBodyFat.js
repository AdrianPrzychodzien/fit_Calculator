import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { MyTextField } from '../../util/Formik/FormikFunctions'

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo'
import { setFatData, setFatPercentage } from '../../redux/actions'
import { bodyFatFormula, idealBodyFatPercentage } from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


let localUserSize
JSON.parse(localStorage.getItem('userData')) === null ?
  localUserSize = '' : localUserSize = JSON.parse(localStorage.getItem('userData'))

const validationSchema = yup.object({
  waist: yup.number('It must be a number').required('Waist is required').positive(),
  hip: yup.number('It must be a number').required('Hip is required').positive(),
  neck: yup.number('It must be a number').required('Neck is required').positive()
})

const FormikBodyFat = ({ setFatData, setFatPercentage, currentUser, userData, history }) => {
  const [userSize, setUserSize] = useState({
    waist: localUserSize.waist || '',
    hip: localUserSize.hip || '',
    neck: localUserSize.neck || '',
    fat: localStorage.fat || '',
    open: false
  })

  useEffect(() => {
    setFatData({
      userSize
      // userId: currentUser.id
    })
  }, [userSize])


  const { waist, hip, neck, open } = userSize
  const { sex, height } = userData

  const bodyFat = bodyFatFormula(userSize, userData)
  const bodyFatMass = ((userData.weight * bodyFat) / 100).toFixed(2)
  const leanBodyMass = (userData.weight - bodyFatMass).toFixed(2)
  const bodyFatToLose = (bodyFat - idealBodyFatPercentage(userData)).toFixed(1)

  return (
    <div>
      <Formik initialValues={{
        waist: '',
        hip: '',
        neck: '',
        fat: ''
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          setUserSize({
            waist: data.waist,
            hip: data.hip,
            neck: data.neck,
            fat: bodyFatFormula(userSize, userData),
            open: true
          })

          // setFatData({
          //   userSize: data,
          //   userId: currentUser.id
          // })
          // setFatPercentage({
          //   fatPercentage: bodyFatFormula(userSize, userData),
          //   userId: currentUser.id
          // })
          localStorage.setItem('userFatData', bodyFatFormula(userSize, userData))
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

      {open && sex && height ? (
        open && bodyFat > 0 ? (
          <div className="personalData__result">
            <h2 className="personalData__result--title">
              Your body fat is {bodyFat} %
          <div className="personalData__result--icon">
                <FatPercentageInfo />
              </div>
            </h2>
            <h4>Body fat mass: {bodyFatMass} kg</h4>
            <h4>Lean body mass: {leanBodyMass} kg</h4>
            <h4>Ideal body fat for given age: {idealBodyFatPercentage(userData)} %</h4>

            {bodyFatToLose > 0 ? (
              <h4>Body fat to lose to reach ideal: {bodyFatToLose} %</h4>) : (
                <h4>You are below ideal fat percentage!</h4>)}

            <div className="form__button">
              <Button onClick={() => history.push('/')}>
                go to home page
            </Button>
            </div>
          </div>
        ) : (open &&
          <div className="personalData__warning">
            Make sure you entered your measurements correctly!
      </div>
          )
      ) : (
          <div className="personalData__warning">
            Make sure you added information about your sex and height!
        <br />
            This data are necessary to make calculations
          <div className="form__button">
              <Button
                onClick={() => history.push('/personalData')}>
                add data
            </Button>
            </div>
          </div>
        )}
    </div>
  )
}


const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data)),
  setFatPercentage: data => dispatch(setFatPercentage(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormikBodyFat)