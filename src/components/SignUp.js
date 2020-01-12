import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from './FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import { withStyles } from '@material-ui/core'

import { auth, createUserProfileDocument } from '../firebase/firebase.utils'

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

  const { displayName, email, password, confirmPassword } = userCredentials

  const handleChange = e => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords don`t match')
      return
    }

    try {
      let { user } = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDocument(user, { displayName })

      setUserCredentials({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.signUp}>
      <h2 className={classes.title}>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
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
  {}
)(withStyles(styles)(SignUp))