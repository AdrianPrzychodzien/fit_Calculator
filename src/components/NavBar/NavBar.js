import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import HamburgerButton from '../HamburgerButton/HamburgerButton'
import { auth } from '../../firebase/firebase.utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faPlus,
  faSignOutAlt,
  faQuestionCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

import './NavBar.scss'

const NavBar = ({ currentUser, sidebarOpen }) => {

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__navigation">
          <HamburgerButton />
          <Link to='/' className={sidebarOpen ? 'close header__navigation--link' : "header__navigation--link"}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Link>
        </div>
        <div className="header__options">
          <Link to='/personalData' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </Link>
          <Link to='/help' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}>
            <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
          </Link>
          {currentUser ? (
            <Link to='/' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'}
              onClick={() => auth.signOut()}>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
            </Link>
          ) : (
              <Link to='/signin' className={sidebarOpen ? 'close header__options--link' : 'header__options--link'} >
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
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