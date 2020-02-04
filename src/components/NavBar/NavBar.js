import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome, faPlus, faSignOutAlt, faQuestionCircle, faUserPlus, faBars,
  faTimes, faPercentage, faBalanceScaleRight, faUtensils, faWeight, faPencilRuler
} from '@fortawesome/free-solid-svg-icons'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap'

const dropdownStyle = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.4)',
  top: '3rem',
  left: 0,
  zIndex: 10
}

const NavBar = ({ currentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(!dropdownOpen)

  return (
    <div>
      <Nav tabs className="bg-primary fixed-top w-100 mx-auto h-10 d-flex flex-nowrap justify-content-between">
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="bg-primary" nav >
            {dropdownOpen ? (
              <FontAwesomeIcon color="white" icon={faTimes} size="2x" />
            ) : (
                <FontAwesomeIcon color="white" icon={faBars} size="2x" />
              )}
          </DropdownToggle>
          <DropdownMenu className="w-20 py-0"  >
            <hr className="mt-0" />
            <DropdownItem className="py-2">
              <Link to="/circumferences" className='d-flex' >
                <FontAwesomeIcon icon={faPencilRuler} size="2x" />
                <p className="h4 ml-2">Circum</p>
              </Link>
            </DropdownItem>
            <hr />
            <DropdownItem className="py-2">
              <Link to="/bodyFat" className='d-flex' >
                <FontAwesomeIcon icon={faPercentage} size="2x" />
                <p className="h4 ml-2">Body Fat</p>
              </Link>
            </DropdownItem>
            <hr />
            <DropdownItem className="py-2">
              <Link to='bmi' className="d-flex">
                <FontAwesomeIcon icon={faBalanceScaleRight} size="2x" />
                <p className="h4 ml-2">BMI</p>
              </Link>
            </DropdownItem>
            <hr />
            <DropdownItem className="py-2">
              <Link to='calories' className="d-flex">
                <FontAwesomeIcon icon={faUtensils} size="2x" />
                <p className="h4 ml-2">Calories</p>
              </Link>
            </DropdownItem>
            <hr />
            <DropdownItem className="py-2">
              <Link to='help' className="d-flex">
                <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
                <p className="h4 ml-2">Help</p>
              </Link>
            </DropdownItem>
            <hr className="mb-0" />
          </DropdownMenu>
        </Dropdown>

        <p className="m-0 d-flex justify-content-center">
          <NavItem>
            <NavLink href="/">
              <FontAwesomeIcon color="white" icon={faHome} size="2x" />
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/personalData">
              <FontAwesomeIcon color="white" icon={faPlus} size="2x" />
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/weightTracker">
              <FontAwesomeIcon color="white" icon={faWeight} size="2x" />
            </NavLink>
          </NavItem>
        </p>

        {currentUser ? (
          <NavItem className="">
            <NavLink href='/' onClick={() => auth.signOut()}>
              <FontAwesomeIcon color="white" icon={faSignOutAlt} size="2x" />
            </NavLink>
          </NavItem>
        ) : (
            <NavItem className="">
              <NavLink href='/signin'  >
                <FontAwesomeIcon color="white" icon={faUserPlus} size="2x" />
              </NavLink>
            </NavItem>
          )}
      </Nav>
      {dropdownOpen ? (
        <div style={dropdownStyle} />
      ) : null}
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(NavBar)