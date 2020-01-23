import React from 'react'

import './Backdrop.scss'

const Backdrop = ({ dropdownOpen }) => (
  <div className={dropdownOpen ? 'backdrop' : ''} />
)


export default Backdrop