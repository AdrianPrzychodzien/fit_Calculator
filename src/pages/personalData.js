import React, { useState } from 'react'
import { withStyles } from '@material-ui/core'

import FormInput from '../components/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'

import HeightIcon from '@material-ui/icons/Height';

const styles = theme => ({
  personalData: {
    padding: '10px 30px'
  }
})

const PersonalData = ({ classes }) => {
  const [userData, setUserData] = useState({
    height: '',
    weight: '',
    age: '',
    sex: '',
    lifeActivity: ''
  })

  const { height, weight, age, sex, lifeActivity } = userData

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
        <FormInput
          type='radio'
          name='sex'
          value={sex}
          onChange={handleChange}
          label='sex'
          required
        />
        <FormInput
          type='text'
          name='lifeActivity'
          value={lifeActivity}
          onChange={handleChange}
          label='Life Activity'
          required
        />
        <CustomButton type='submit'>ADD DATA</CustomButton>
      </form>
    </div>
  )
}

export default withStyles(styles)(PersonalData)