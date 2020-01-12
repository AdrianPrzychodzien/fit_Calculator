import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase.utils'
import { withStyles } from '@material-ui/core'
import {
  Add as AddIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  PersonAdd,
  ExitToApp
} from '@material-ui/icons'

const styles = theme => ({
  ...theme.styles,
  header: {
    display: 'flex',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    marginBottom: 25,
    backgroundColor: 'rgb(44, 128, 255)'
  },
  homeIcon: {
    height: '100 %',
    width: 70,
    padding: 25
  },
  options: {
    display: 'flex',
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  link: {
    padding: '10px 15px',
    cursor: 'pointer'
  }
})

const NavBar = ({ classes, currentUser }) => {

  return (
    <div className={classes.header}>
      <Link to='/' className={classes.homeIcon}>
        <HomeIcon />
      </Link>
      <div className={classes.options}>
        <Link to='/personalData' className={classes.link}>
          <AddIcon />
        </Link>
        <Link to='/help' className={classes.link}>
          <HelpIcon />
        </Link>
        {currentUser ? (
          <Link to='/' className={classes.link} onClick={() => auth.signOut()}>
            <ExitToApp />
          </Link>
        ) : (
            <Link to='/signin' className={classes.link} >
              <PersonAdd />
            </Link>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(withStyles(styles)(NavBar))