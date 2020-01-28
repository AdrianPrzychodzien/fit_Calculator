import React, { useState } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core'
import { Button } from 'reactstrap'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { MyTextField } from '../../util/Formik/FormikFunctions'

import { setWeightData } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeight } from '@fortawesome/free-solid-svg-icons'

const validationSchema = yup.object({
  weight: yup.number('It must be a number').required('Waist is required').positive()
})

const WeightTracker = ({ currentUser, userData, setWeightData, history }) => {
  const [userWeight, setUserWeight] = useState({
    weight: ''
  })

  // const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  return (
    <>
      <p className="h2 text-center">Weight Tracker</p>
      <Formik initialValues={{
        weight: userData.weight || ''
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          setUserWeight({
            weight: data.weight
          })
          setWeightData({
            weight: data.weight,
            userId: currentUser.id
          })
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-100 d-flex flex-column justify-content-center">
            <div className="mx-auto my-3 w-50 d-flex">
              <FontAwesomeIcon className="mr-3 text-primary" icon={faWeight} size="2x" />
              <MyTextField type="number" name="weight" placeholder="Weight (kg)" as={TextField} />
            </div>

            <Button type='submit' color="primary">
              Add
            </Button>
          </Form>
        )}
      </Formik>
      <p className="h6 text-center my-3"></p>
      <hr />


    </>
  )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setWeightData: data => dispatch(setWeightData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightTracker)