import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import { withStyles } from '@material-ui/core'

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

  const handleChange = e => {
    const { value, name } = e.target

    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={classes.signIn}>
      <h2 className={classes.title}>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={userCredentials.email}
          onChange={handleChange}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={userCredentials.password}
          onChange={handleChange}
          label='password'
          required
        />
        <div className={classes.buttons}>
          <button type='submit'>Sign In</button>
          <button
            type='button'
          // onClick={}
          >Sign in with Google</button>
        </div>
      </form>
    </div>
  )
}

export default withStyles(styles)(SignIn)