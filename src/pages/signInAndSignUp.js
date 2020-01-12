import React from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  signInSignUp: {
    display: 'block',
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '30px auto'
  }
})

const SignInAndSignUp = ({ classes }) => (
  <div className={classes.signInSignUp}>
    <SignIn />
    <SignUp />
  </div>
)

export default withStyles(styles)(SignInAndSignUp)