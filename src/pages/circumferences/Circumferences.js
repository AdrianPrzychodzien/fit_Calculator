import React, { useState } from 'react'
import { connect } from 'react-redux'

import { MyTextField } from '../../util/Formik/FormikFunctions'
import { myDateFormat, diffDays, circumferencesChange, biggestCircumChange } from '../../util/equations'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import { Collapse, Button, CardBody, Card } from 'reactstrap'
import moment from 'moment'
// import * as Icon from 'react-feather'
// import { Person } from '@material-ui/icons'

import { setCircumferences, setBodyFatCircum } from '../../redux/actions'

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

const Circumferences = ({ circumData, setCircumferences, setBodyFatCircum }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const { circumferences } = circumData

  const circumIsEmpty = circumferences.length < 1
  const firstUpdate = moment(circumferences[0].date).format('YYYY-MM-DD')
  const lastUpdate = moment(circumferences[circumferences.length - 1].date).format('YYYY-MM-DD')
  const nextUpdate = moment(lastUpdate).startOf(lastUpdate).add(1, 'weeks').format('YYYY-MM-DD')

  const arrayOfCircumferences = circumferencesChange(circumferences)
  const descendingList = biggestCircumChange(arrayOfCircumferences, 'desc')
  // const ascendingList = biggestCircumChange(arrayOfCircumferences, 'asc')

  return (
    <div>
      <p className="h2 text-center">Body circumferences</p>
      <hr />

      <div className="h6 w-100">
        <div className="d-flex">
          <p className="w-50 text-center mt-1 mb-3">Last update: <br /> {myDateFormat(lastUpdate)}</p>
          <p className="w-50 text-center mt-1 mb-3">Next update: <br /> {myDateFormat(nextUpdate)}</p>
        </div>
        <Button size="sm" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}
        >
          <FontAwesomeIcon icon={faPencilRuler} className="mr-2" />
          Update measurements
        </Button>

        {/* Collapse with Formik (measurements) */}
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              <Formik initialValues={{
                waist: circumIsEmpty ? '' : circumferences[circumferences.length - 1].waist || '',
                hips: circumIsEmpty ? '' : circumferences[circumferences.length - 1].hips || '',
                neck: circumIsEmpty ? '' : circumferences[circumferences.length - 1].neck || '',
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
                  setBodyFatCircum({
                    waist: data.waist,
                    hips: data.hips,
                    neck: data.neck
                  })
                }}
              >
                {({ isSubmitting }) => (
                  <>
                    <Form className="w-100 d-flex flex-column justify-content-center">
                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Waist</p>
                        <MyTextField type="number" name="waist" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Hips</p>
                        <MyTextField type="number" name="hips" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Neck</p>
                        <MyTextField type="number" name="neck" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Chest</p>
                        <MyTextField type="number" name="chest" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Shoulders</p>
                        <MyTextField type="number" name="shoulders" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Thighs</p>
                        <MyTextField type="number" name="thighs" as={TextField} />
                      </div>

                      <div className="mx-auto my-1 w-50 d-flex">
                        <p className="h5 mr-2 mb-0 mt-1">Biceps</p>
                        <MyTextField type="number" name="biceps" as={TextField} />
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
            </CardBody>
          </Card>
        </Collapse>
      </div>

      <p className="h5">{diffDays(firstUpdate)} days have passed since first measurement</p>
      <p className="h5">The biggest change occured in ..., ...cm</p>
      <p>Descending list of circums: 1. {descendingList[0].name}: {descendingList[0].value}</p>
      <p>Descending list of circums: 2. {descendingList[1].name}: {descendingList[1].value}</p>
      <p>Descending list of circums: 3. {descendingList[2].name}: {descendingList[2].value}</p>
    </div>
  )
}

const mapStateToProps = ({ data, circum }) => ({
  userData: data,
  circumData: circum
})

const mapDispatchToProps = dispatch => ({
  setCircumferences: data => dispatch(setCircumferences(data)),
  setBodyFatCircum: data => dispatch(setBodyFatCircum(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Circumferences)