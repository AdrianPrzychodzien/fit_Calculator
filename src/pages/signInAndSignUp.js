import React from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

import './SignInAndSignUp.scss'

const SignInAndSignUp = () => (
  <div className="signInSignUp">
    <SignIn />
    <SignUp />
  </div>
)

export default SignInAndSignUp