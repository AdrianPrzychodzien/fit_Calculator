import React from 'react'
import { connect } from 'react-redux'

import { setSidebarState } from '../../redux/actions'

import './Backdrop.scss'

const Backdrop = ({ setSidebarState }) => (
  <div className="backdrop" onClick={() => setSidebarState(false)} />
)

const mapDispatchToProps = dispatch => ({
  setSidebarState: data => dispatch(setSidebarState(data))
})

export default connect(null, mapDispatchToProps)(Backdrop)