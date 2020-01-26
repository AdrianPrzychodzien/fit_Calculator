import React from 'react'
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'

import './SignInAndSignUp.scss'

const SignInAndSignUp = () => (
  <div className="text-center">
    <SignIn />
    <hr />
    <SignUp />
  </div>
)

export default SignInAndSignUp