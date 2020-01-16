import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import { setFatData } from '../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBirthdayCake,
  faArrowsAltV,
  faFemale,
  faMale,
  faWeight,
  faPercentage
} from '@fortawesome/free-solid-svg-icons'

import './BodyFat.scss'

const BodyFat = ({ setFatData, currentUser }) => {
  const [userData, setUserData] = useState({
    waist: '',
    hip: '',
    neck: ''
  })

  const { waist, hip, neck } = userData

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setFatData({
      userData,
      userId: currentUser.id
    })

    setUserData({
      waist: '',
      hip: '',
      neck: ''
    })

    // history.push('/')
  }

  return (
    <div className="personalData">
      <h2 className="personalData__title">Measure your body</h2>
      <hr />
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faArrowsAltV} size="2x" />
          </div>
          <div className="form__field--input">
            <FormInput
              type='number'
              name='waist'
              value={waist}
              onChange={handleChange}
              label='Waist (cm)'
              required
            />
          </div>
        </div>

        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faWeight} size="2x" />
          </div>
          <div className="form__field--input">
            <FormInput
              type='number'
              name='hip'
              value={hip}
              onChange={handleChange}
              label='Hip (cm)'
              required
            />
          </div>
        </div>

        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faBirthdayCake} size="2x" />
          </div>
          <div className="form__field--input">
            <FormInput
              type='number'
              name='neck'
              value={neck}
              onChange={handleChange}
              label='Neck (cm)'
              required
            />
          </div>
        </div>

        <hr />
        <div className="form__button">
          <CustomButton type='submit' >ADD DATA</CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)