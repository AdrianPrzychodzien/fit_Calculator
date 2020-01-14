import React, { useState } from 'react'

import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import ActivityInfo from '../components/ActivityInfo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBirthdayCake,
  faArrowsAltV,
  faFemale,
  faMale,
  faWeight
} from '@fortawesome/free-solid-svg-icons'
import { Rating } from '@material-ui/lab'
import './PersonalData.scss'


const PersonalData = () => {
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    age: '',
    sex: '',
    lifeActivity: 1
  })

  const { height, weight, age, sex, lifeActivity } = userData

  console.log(userData);

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="personalData">
      <h2 className="personalData__title">Add your personal data</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__field">
          <FontAwesomeIcon icon={faArrowsAltV} size="2x" className="form__icon" />
          <FormInput
            type='text'
            name='height'
            value={height}
            onChange={handleChange}
            label='Height (cm)'
            required
          />
        </div>
        <div className="form__field">
          <FontAwesomeIcon icon={faWeight} size="2x" className="form__icon" />
          <FormInput
            type='text'
            name='weight'
            value={weight}
            onChange={handleChange}
            label='Weight (kg)'
            required
          />
        </div>
        <div className="form__field">
          <FontAwesomeIcon icon={faBirthdayCake} size="2x" className="form__icon" />
          <FormInput
            type='text'
            name='age'
            value={age}
            onChange={handleChange}
            label='Age'
            required
          />
        </div>
        <div className="form__field--radio">
          <h2>Sex:</h2>
          <label>
            <input
              type='radio'
              name='sex'
              value='Male'
              checked={sex === 'Male'}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faMale} size="2x" className="form__icon" />
          </label>
          <label>
            <input
              type='radio'
              name='sex'
              value='Female'
              checked={sex === 'Female'}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon icon={faFemale} size="2x" className="form__icon" />
          </label>
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
          <ActivityInfo />
        </div>
        <br />
        <div className="form__button">
          <CustomButton type='submit' >ADD DATA</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default PersonalData