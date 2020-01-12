import React, { useState } from 'react'
import FormInput from './FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  signUp: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    margin: '10px 0'
  }
})

const SignUp = ({ classes }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = e => {
    const { name, value } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={classes.signUp}>
      <h2 className={classes.title}>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={userCredentials.displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={userCredentials.email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={userCredentials.password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={userCredentials.confirmPassword}
          onChange={handleChange}
          label='confirmPassword'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default withStyles(styles)(SignUp)