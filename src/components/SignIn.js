import React, { useState } from 'react'
import FormInput from '../util/FormInput/FormInput'
import CustomButton from '../util/CustomButton/CustomButton'
import { withStyles } from '@material-ui/core'

import { auth, signInWithGoogle } from '../firebase/firebase.utils'

const styles = theme => ({
  signIn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    margin: '10px 0'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
})

const SignIn = ({ classes }) => {
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
    <div className={classes.signIn}>
      <h2 className={classes.title}>I already have an account</h2>
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
        <div className={classes.buttons}>
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

export default withStyles(styles)(SignIn)