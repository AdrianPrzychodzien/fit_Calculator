import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import HamburgerButton from '../HamburgerButton/HamburgerButton'
import { auth } from '../../firebase/firebase.utils'
import {
  Add as AddIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  PersonAdd,
  ExitToApp,
} from '@material-ui/icons'

import './NavBar.scss'

const NavBar = ({ currentUser, sidebarOpen }) => {

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__navigation">
          <HamburgerButton />
          <Link to='/' className={sidebarOpen ? 'close header__navigation--link' : "header__navigation--link"}>
            <HomeIcon fontSize="large" />
          </Link>
        </div>
        <div className="header__options">
          <Link to='/personalData' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}>
            <AddIcon fontSize="large" />
          </Link>
          <Link to='/help' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}>
            <HelpIcon fontSize="large" />
          </Link>
          {currentUser ? (
            <Link to='/' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}
              onClick={() => auth.signOut()}>
              <ExitToApp fontSize="large" />
            </Link>
          ) : (
              <Link to='/signin' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'} >
                <PersonAdd fontSize="large" />
              </Link>
            )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, ui }) => ({
  currentUser: user.currentUser,
  sidebarOpen: ui.sidebarOpen
})

export default connect(mapStateToProps)(NavBar)