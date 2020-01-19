import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { setSidebarState } from '../../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faPlus,
  faBalanceScaleRight,
  faPercentage,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'

import './SideBar.scss'

const SideBar = ({ sidebarOpen, setSidebarState }) => {

  return (
    <div className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
      <div className="sidebar__nav">
        <Link to="/"
          className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}
        >
          <div className="nav--icon">
            <FontAwesomeIcon icon={faHome} size="2x" />
          </div>
          <div className="nav--link">
            Home
          </div>
        </Link>
        <hr />

        <Link to="/personalData"
          className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}
        >
          <div className="nav--icon">
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </div>
          <div className="nav--link">
            Personal data
          </div>
        </Link>
        <hr />

        <Link to="/bodyFat"
          className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}
        >
          <div className="nav--icon">
            <FontAwesomeIcon icon={faPercentage} size="2x" />
          </div>
          <div className="nav--link">
            Body Fat
          </div>
        </Link>
        <hr />

        <Link to="/bmi"
          className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}
        >
          <div className="nav--icon">
            <FontAwesomeIcon icon={faBalanceScaleRight} size="2x" />
          </div>
          <div className="nav--link">
            BMI
          </div>
        </Link>
        <hr />

        <Link to="/bmr"
          className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}
        >
          <div className="nav--icon">
            <FontAwesomeIcon icon={faUtensils} size="2x" />
          </div>
          <div className="nav--link">
            BMR
          </div>
        </Link>

      </div>
    </div>
  )
}

const mapStateToProps = ({ ui }) => ({
  sidebarOpen: ui.sidebarOpen
})

const mapDispatchToProps = dispatch => ({
  setSidebarState: data => dispatch(setSidebarState(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)