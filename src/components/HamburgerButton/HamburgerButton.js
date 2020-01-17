import React from 'react'
import { connect } from 'react-redux'

import { setSidebarState } from '../../redux/actions'

import './HamburgerButton.scss'

const HamburgerButton = ({ sidebarOpen, setSidebarState }) => (
  <button className={sidebarOpen ? "toggle__button close" : "toggle__button"}
    onClick={() => setSidebarState(!sidebarOpen)}>
    <div className="btn-line"></div>
    <div className="btn-line"></div>
    <div className="btn-line"></div>
  </button>
)

const mapStateToProps = ({ ui }) => ({
  sidebarOpen: ui.sidebarOpen
})

const mapDispatchToProps = dispatch => ({
  setSidebarState: data => dispatch(setSidebarState(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerButton)