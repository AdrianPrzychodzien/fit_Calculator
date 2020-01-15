import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'

import { auth, createUserProfileDocument } from '../firebase/firebase.utils'

import './SignUp.scss'

const SignUp = () => {
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
    <div className="signup">
      <h2 className="signup__title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='display name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='email'
          required
        />
        <div className="signup__passwordGroup">
          <div className="signup__passwordGroup--1">
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              label='password'
              required
            />
          </div>
          <div className="signup__passwordGroup--2">
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              label='confirm password'
              required
            />
          </div>
        </div>
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default connect(
  null,
  {}
)(SignUp)