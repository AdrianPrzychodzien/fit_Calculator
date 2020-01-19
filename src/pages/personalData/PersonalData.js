import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import FormInput from '../../util/FormInput/FormInput'
import CustomButton from '../../util/CustomButton/CustomButton'
import ActivityInfo from '../../components/Info/ActivityInfo/ActivityInfo'
import BodyFatInfo from '../../components/Info/BodyFatInfo/BodyFatInfo'
import { setData } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBirthdayCake,
  faArrowsAltV,
  faFemale,
  faMale,
  faWeight,
  faPercentage
} from '@fortawesome/free-solid-svg-icons'
import { Rating } from '@material-ui/lab'

import './PersonalData.scss'

const PersonalData = ({ setData, currentUser, history }) => {
  const [userData, setUserData] = useState({
    height: JSON.parse(localStorage.userData).height || '',
    weight: JSON.parse(localStorage.userData).weight || '',
    age: JSON.parse(localStorage.userData).age || '',
    sex: JSON.parse(localStorage.userData).sex || '',
    lifeActivity: JSON.parse(localStorage.userData).lifeActivity || 1,
    fat: JSON.parse(localStorage.userData).fat || ''
  })

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  const { height, weight, age, sex, lifeActivity, fat } = userData

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    setData({
      userData,
      userId: currentUser.id
    })

    history.push('/')
  }

  return (
    <div className="personalData">
      <h2 className="personalData__title">Add your personal data</h2>
      <hr />
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faArrowsAltV} size="2x" />
          </div>
          <div className="form__field--input">
            <FormInput
              type='number'
              name='height'
              value={height}
              onChange={handleChange}
              label='Height (cm)'
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
              name='weight'
              value={weight}
              onChange={handleChange}
              label='Weight (kg)'
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
              name='age'
              value={age}
              onChange={handleChange}
              label='Age'
              required
            />
          </div>
        </div>

        <div className="form__field">
          <div className="form__field--icon">
            <FontAwesomeIcon icon={faPercentage} size="2x" />
          </div>
          <div className="form__field--inputFat">
            <FormInput
              type='number'
              name='fat'
              value={fat}
              onChange={handleChange}
              label='Body Fat %'
            />
          </div>
          <div className="form__field--icon">
            <BodyFatInfo />
          </div>
        </div>


        <div className="form__field--radio">
          <h2>Sex:</h2>
          <div className="form__field--radio--input">
            <label>
              <input
                type='radio'
                name='sex'
                value='Male'
                checked={sex === 'Male'}
                onChange={handleChange}
                required
              />
            </label>
            <div className="form__field--icon">
              <FontAwesomeIcon icon={faMale} size="2x" className="form__icon" />
            </div>
          </div>
          <div className="form__field--radio--input">
            <label>
              <input
                type='radio'
                name='sex'
                value='Female'
                checked={sex === 'Female'}
                onChange={handleChange}
                required
              />
            </label>
            <div className="form__field--icon">
              <FontAwesomeIcon icon={faFemale} size="2x" className="form__icon" />
            </div>
          </div>
        </div>

        <div className="form__field--activity">
          <h2>Life activity: </h2>
          <Rating
            size="large"
            name="life activity"
            value={lifeActivity}
            onChange={(event, newValue) => {
              setUserData({ ...userData, lifeActivity: newValue })
            }}
            required
          />
          <div className="form__field--icon">
            <ActivityInfo />
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
  setData: data => dispatch(setData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData)