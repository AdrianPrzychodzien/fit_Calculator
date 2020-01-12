import React, { useState } from 'react'
import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'

import { auth, signInWithGoogle } from '../firebase/firebase.utils'

import './SignIn.scss'

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const handleChange = e => {
    const { value, name } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setUserCredentials({ email: '', password: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signin">
      <h2 className="signin__title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          onChange={handleChange}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
          label='password'
          required
        />
        <div className="signin__buttons">
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton
            type='button'
            isGoogleSignIn
            onClick={signInWithGoogle}
          >
            Sign in with Google
            </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn