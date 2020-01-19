import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo'
import FormInput from '../../util/FormInput/FormInput'
import CustomButton from '../../util/CustomButton/CustomButton'
import { setFatData, setFatPercentage } from '../../redux/actions'
import { bodyFatFormula, idealBodyFatPercentage } from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './BodyFat.scss'

const BodyFat = ({ setFatData, setFatPercentage, currentUser, userData, history }) => {
  const [userSize, setUserSize] = useState({
    waist: JSON.parse(localStorage.userSize).waist || '',
    hip: JSON.parse(localStorage.userSize).hip || '',
    neck: JSON.parse(localStorage.userSize).neck || '',
    open: false
  })

  useEffect(() => {
    localStorage.setItem('userSize', JSON.stringify(userSize))
  }, [userSize])

  const { waist, hip, neck, open } = userSize

  const bodyFat = bodyFatFormula(userSize, userData)
  const bodyFatMass = (userData.weight * bodyFat) / 100
  const leanBodyMass = userData.weight - bodyFatMass
  const bodyFatToLose = (bodyFat - idealBodyFatPercentage(userData)).toFixed(1)

  const handleChange = e => {
    const { name, value } = e.target
    setUserSize({ ...userSize, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setUserSize({ ...userSize, open: true })

    setFatData({
      userSize,
      userId: currentUser.id
    })

    setFatPercentage({
      fatPercentage: bodyFat,
      userId: currentUser.id
    })
  }

  return (
    <div className="personalData">
      <h2 className="personalData__title">Body fat percentage</h2>
      <hr />
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faCheck} size="2x" />
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
            <FontAwesomeIcon icon={faCheck} size="2x" />
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
            <FontAwesomeIcon icon={faCheck} size="2x" />
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
          <CustomButton
            type='submit'
          >CALCULATE</CustomButton>
        </div>
      </form>
      <hr />

      {open && bodyFat > 0 ? (
        <div className="personalData__result">
          <h2 className="personalData__result--title">
            Your body fat is {bodyFat} %
          <FatPercentageInfo />
          </h2>
          <h4>Body fat mass: {bodyFatMass} kg</h4>
          <h4>Lean body mass: {leanBodyMass} kg</h4>
          <h4>Ideal body fat for given age: {idealBodyFatPercentage(userData)} %</h4>

          {bodyFatToLose > 0 ? (
            <h4>Body fat to lose to reach ideal: {bodyFatToLose} %</h4>) : (
              <h4>You are below ideal fat percentage!</h4>)}

          <div className="form__button">
            <CustomButton onClick={() => history.push('/')}>
              go to home page
            </CustomButton>
          </div>
        </div>
      ) : (open &&
        <div className="personalData__warning">
          Make sure you entered your measurements correctly!
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

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)