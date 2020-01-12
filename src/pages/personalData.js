import React, { useState } from 'react'
import { withStyles } from '@material-ui/core'

import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'

import HeightIcon from '@material-ui/icons/Height';
import { Rating } from '@material-ui/lab'

const styles = theme => ({
  personalData: {
    padding: '10px 30px'
  }
})

const PersonalData = ({ classes }) => {
  const [userData, setUserData] = useState({
    height: '0',
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
    <div className={classes.personalData}>
      <h2 className={classes.title}>Add your personal data</h2>
      <form onSubmit={handleSubmit}>
        <HeightIcon />
        <FormInput
          type='text'
          name='height'
          value={height}
          onChange={handleChange}
          label='Height'
          required
        />
        <FormInput
          type='text'
          name='weight'
          value={weight}
          onChange={handleChange}
          label='Weight'
          required
        />
        <FormInput
          type='text'
          name='age'
          value={age}
          onChange={handleChange}
          label='age'
          required
        />
        <h4>Sex:
          <label>
            <input
              type='radio'
              name='sex'
              value='Male'
              checked={sex === 'Male'}
              onChange={handleChange}
              required
            />
            Male
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
            Female
            </label>
        </h4>
        <h4>Life activity:
        <Rating
            name="life activity"
            value={lifeActivity}
            onChange={(event, newValue) => {
              setUserData({ ...userData, lifeActivity: newValue })
            }}
            required
          />
        </h4>
        <CustomButton type='submit'>ADD DATA</CustomButton>
      </form>
    </div>
  )
}

export default withStyles(styles)(PersonalData)