import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from './FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import { withStyles } from '@material-ui/core'

import { signUpUser } from '../redux/actions'

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

const SignUp = ({ classes, signUpUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials

  const handleChange = e => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords don`t match')
      return
    }

    signUpUser({ displayName, email, password })
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

export default connect(
  null,
  { signUpUser }
)(withStyles(styles)(SignUp))