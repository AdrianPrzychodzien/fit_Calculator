import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { auth } from '../firebase/firebase.utils'
import {
  Add as AddIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  PersonAdd,
  ExitToApp
} from '@material-ui/icons'

import './NavBar.scss'


const NavBar = ({ currentUser }) => {

  return (
    <div className="header">
      <Link to='/' className="header__icon">
        <HomeIcon />
      </Link>
      <div className="header__options">
        <Link to='/personalData' className="header__options--link">
          <AddIcon />
        </Link>
        <Link to='/help' className="header__options--link">
          <HelpIcon />
        </Link>
        {currentUser ? (
          <Link to='/' className="header__options--link" onClick={() => auth.signOut()}>
            <ExitToApp />
          </Link>
        ) : (
            <Link to='/signin' className="header__options--link" >
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

export default connect(mapStateToProps)(NavBar)