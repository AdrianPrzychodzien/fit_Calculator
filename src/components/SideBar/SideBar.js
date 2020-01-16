import React from 'react'

import './SideBar.scss'

const SideBar = ({ show }) => {
  let drawerClasses = 'sidebar'
  if (show) {
    drawerClasses = 'sidebar open'
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>page</li>
        <li>page</li>
        <li>page</li>
      </ul>
    </nav>
  )
}

export default SideBar