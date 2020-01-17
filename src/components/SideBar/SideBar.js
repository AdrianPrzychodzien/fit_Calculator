import React from 'react'

import { Link } from 'react-router-dom'

import './SideBar.scss'

const SideBar = ({ show }) => {
  let drawerClasses = 'sidebar'
  if (show) {
    drawerClasses = 'sidebar open'
  }

  return (
    <nav className={drawerClasses}>
      <ul className="sidebar__nav">
        <li className="sidebar__nav--item">
          <Link to="/" className="nav--link" >
            Home page
            </Link>
        </li>
        <li className="sidebar__nav--item">
          <Link to="/personalData" className="nav--link" >
            Personal rates page
            </Link>
        </li>
        <li className="sidebar__nav--item">
          <Link to="/bodyFat" className="nav--link" >
            Body Fat page
            </Link>
        </li>
        <li className="sidebar__nav--item">
          <Link to="/bmi" className="nav--link" >
            BMI page
            </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar