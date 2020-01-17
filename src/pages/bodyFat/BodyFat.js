import React, { useState } from 'react'
import { connect } from 'react-redux'

import FatPercentageInfo from '../../components/Info/FatPercentageInfo/FatPercentageInfo'
import FormInput from '../../util/FormInput/FormInput'
import CustomButton from '../../util/CustomButton/CustomButton'
import { setFatData, setFatPercentage } from '../../redux/actions'
import { bodyFatFormula } from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './BodyFat.scss'

const BodyFat = ({ setFatData, setFatPercentage, currentUser, userData, history }) => {
  const [userSize, setUserSize] = useState({
    waist: '',
    hip: '',
    neck: '',
    open: true
  })

  const { waist, hip, neck, open } = userSize

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

    setUserSize({ ...userSize, open: !open })
    // setUserSize({
    //   waist: '',
    //   hip: '',
    //   neck: '',
    //   open
    // })
  }

  const handleUpdate = () => {
    setFatPercentage({
      fatPercentage: bodyFatFormula(userData),
      userId: currentUser.id
    })

    history.push('/')
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
          <CustomButton type='submit' >CALCULATE</CustomButton>
        </div>
      </form>
      <hr />

      <div className="personalData__result">
        <h2 className="personalData__result--title">
          Your body fat is {open && bodyFatFormula(userData)} %
          {open && <FatPercentageInfo />}
        </h2>
        {open && <div onClick={handleUpdate} className="personalData__result--text">
          Update your data and go to home page
        </div>}
      </div>
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