import React, { useState } from 'react'

import FormInput from '../../util/FormInput/FormInput'
import CustomButton from '../../util/CustomButton/CustomButton'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './SignUp.scss'

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState({
    errors: ''
  })

  const { displayName, email, password, confirmPassword } = userCredentials
  const { errors } = error

  const handleChange = e => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError({ errors: 'Passwords don`t match' })
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
      console.log(error)
      setError({ errors: error.message })
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
        <div className="signup__password--1">
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='password'
            required
          />
        </div>
        <div className="signup__password--2">
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='confirm password'
            required
          />
        </div>
        {errors && <div className="signup__errors">{errors}</div>}
        <div className="signup__button">
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignUp