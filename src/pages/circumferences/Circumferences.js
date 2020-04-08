import React from 'react'
import { connect } from 'react-redux'

import { MyTextField } from '../../util/Formik/FormikFunctions'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { Collapse, Button, CardBody, Card } from 'reactstrap'
import moment from 'moment'
import * as Icon from 'react-feather'
import { Person } from '@material-ui/icons'

import { setCircumferences } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'

const validationSchema = yup.object({
  waist: yup.number('It must be a number').required('Waist is required').positive(),
  hips: yup.number('It must be a number').required('Hips are required').positive(),
  neck: yup.number('It must be a number').required('Neck is required').positive(),
  chest: yup.number('It must be a number').required('Chest is required').positive(),
  shoulders: yup.number('It must be a number').required('Shoulders is required').positive(),
  thighs: yup.number('It must be a number').required('Thighs are required').positive(),
  biceps: yup.number('It must be a number').required('Biceps are required').positive(),
})

const Circumferences = ({ circumData, setCircumferences }) => {
  const { circumferences } = circumData
  const circumIsEmpty = circumferences.length < 1
  const firstUpdate = moment(circumferences[0].date).format('YYYY-MM-DD')
  const lastUpdate = moment(circumferences[circumferences.length - 1].date).format('YYYY-MM-DD')
  const nextUpdate = moment(lastUpdate).startOf(lastUpdate).add(1, 'weeks').format('YYYY-MM-DD')

  const arrayOfCircumferences = circumferencesChange(circumferences)
  const descendingList = biggestCircumChange(arrayOfCircumferences, 'desc')
  const ascendingList = biggestCircumChange(arrayOfCircumferences, 'asc')

  console.log(circumferences)
  return (
    <div>
      <Formik initialValues={{
        waist: circumData.waist || '',
        hip: circumData.hip || '',
        neck: circumData.neck || '',
        chest: circumIsEmpty ? '' : circumferences[circumferences.length - 1].chest,
        shoulders: circumIsEmpty ? '' : circumferences[circumferences.length - 1].shoulders,
        thighs: circumIsEmpty ? '' : circumferences[circumferences.length - 1].thighs,
        biceps: circumIsEmpty ? '' : circumferences[circumferences.length - 1].biceps,
      }}
        validationSchema={validationSchema}
        onSubmit={data => {
          setCircumferences({
            date: new Date("2020-03-03").toISOString().slice(0, 10),
            waist: data.waist,
            hips: data.hips,
            neck: data.neck,
            chest: data.chest,
            shoulders: data.shoulders,
            thighs: data.thighs,
            biceps: data.biceps
          })
        }}
      >
        {({ isSubmitting }) => (
          <>
            <p className="h2 text-center">Body circumferences</p>
            <hr />

            <Form className="w-100 d-flex flex-column justify-content-center">
              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Waist</p>
                <MyTextField type="number" name="waist" placeholder="waist" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Hips</p>
                <MyTextField type="number" name="hips" placeholder="hip" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Neck</p>
                <MyTextField type="number" name="neck" placeholder="neck" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Chest</p>
                <MyTextField type="number" name="chest" placeholder="chest" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Shoulders</p>
                <MyTextField type="number" name="shoulders" placeholder="shoulders" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Thighs</p>
                <MyTextField type="number" name="thighs" placeholder="thighs" as={TextField} />
              </div>

              <div className="mx-auto my-3 w-50 d-flex">
                <p className="h5 mr-2">Biceps</p>
                <MyTextField type="number" name="biceps" placeholder="biceps" as={TextField} />
              </div>

              <Button type='submit'
                block className="d-flex justify-content-center my-3" color="primary"
              >
                Add measurements
                </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

const mapStateToProps = ({ data, circum }) => ({
  userData: data,
  circumData: circum
})

const mapDispatchToProps = dispatch => ({
  setCircumferences: data => dispatch(setCircumferences(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Circumferences)