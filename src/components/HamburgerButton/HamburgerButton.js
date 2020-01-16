import React from 'react'

import './HamburgerButton.scss'

const HamburgerButton = ({ toggleSideBar }) => (
  <button className="toggle__button" onClick={toggleSideBar}>
    <div className="toggle__button--line"></div>
    <div className="toggle__button--line"></div>
    <div className="toggle__button--line"></div>
  </button>
)

export default HamburgerButton