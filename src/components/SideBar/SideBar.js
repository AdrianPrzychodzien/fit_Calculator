import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { setSidebarState } from '../../redux/actions'

import './SideBar.scss'

const SideBar = ({ sidebarOpen, setSidebarState }) => {

  return (
    <nav className={sidebarOpen ? 'sidebar open' : 'sidebar'}>
      <ul className="sidebar__nav">
        <li className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}>
          <div className="nav--link">
            <Link to="/" >Home page</Link>
          </div>
        </li>
        <hr />

        <li className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}>
          <div className="nav--link">
            <Link to="/personalData" >Personal rates page</Link>
          </div>
        </li>
        <hr />

        <li className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}>
          <div className="nav--link">
            <Link to="/bodyFat" >Body Fat page</Link>
          </div>
        </li>
        <hr />

        <li className={sidebarOpen ? 'sidebar__nav--item open' : 'sidebar__nav--item'}
          onClick={() => setSidebarState(false)}>
          <div className="nav--link">
            <Link to="/bmi" >BMI page</Link>
          </div>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = ({ ui }) => ({
  sidebarOpen: ui.sidebarOpen
})

const mapDispatchToProps = dispatch => ({
  setSidebarState: data => dispatch(setSidebarState(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)