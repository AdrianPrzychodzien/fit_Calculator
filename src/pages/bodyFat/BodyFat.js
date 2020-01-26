import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo'
import FormInput from '../../util/FormInput/FormInput'
import CustomButton from '../../util/CustomButton/CustomButton'
import { setFatData } from '../../redux/actions'
import { bodyFatFormula, idealBodyFatPercentage } from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './BodyFat.scss'

const BodyFat = ({ setFatData, currentUser, userData, history }) => {
  let localUserSize
  JSON.parse(localStorage.getItem('userSize')) === null ?
    localUserSize = '' : localUserSize = JSON.parse(localStorage.getItem('userSize'))

  const [userSize, setUserSize] = useState({
    waist: localUserSize.waist || '',
    hip: localUserSize.hip || '',
    neck: localUserSize.neck || '',
    open: false
  })

  useEffect(() => {
    localStorage.setItem('userSize', JSON.stringify(userSize))
    localStorage.setItem('userFatData', bodyFatFormula(userSize, userData))
  }, [userSize, userData])

  const { waist, hip, neck, open } = userSize
  const { sex, height } = userData

  const bodyFat = bodyFatFormula(userSize, userData)
  const bodyFatMass = ((userData.weight * bodyFat) / 100).toFixed(2)
  const leanBodyMass = (userData.weight - bodyFatMass).toFixed(2)
  const bodyFatToLose = (bodyFat - idealBodyFatPercentage(userData)).toFixed(1)

  const handleChange = e => {
    const { name, value } = e.target
    setUserSize({ ...userSize, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setFatData({
      userSize,
      userId: currentUser.id
    })

    setUserSize({ ...userSize, open: true })
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
              <CustomButton onClick={() => history.push('/')}>
                go to home page
              </CustomButton>
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
              <CustomButton
                onClick={() => history.push('/personalData')}>
                add data
              </CustomButton>
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
  setFatData: data => dispatch(setFatData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)