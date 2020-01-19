import React, { useState } from 'react'
import { connect } from 'react-redux'

import { activityLevel, restingMifflinStJeor } from '../../../util/equations'

import InfoIcon from '@material-ui/icons/Info'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import './ActivityCaloriesInfo.scss'

const ActivityCaloriesInfo = ({ userData }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const kcalPerDay = (num) => {
    return Math.round(restingMifflinStJeor(userData) * activityLevel(num))
  }

  const { lifeActivity } = userData

  const userActivity = (data, num) => data === num && true

  return (
    <>
      <Tooltip title="get some info" placement="top" >
        <InfoIcon className="info__icon" onClick={handleOpen} />
      </Tooltip>
      <Dialog
        className="info"
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <div className="info__header">
          <Tooltip title="Close" >
            <IconButton onClick={handleClose} >
              <div className="info__close">
                <CloseIcon fontSize="large" />
              </div>
            </IconButton>
          </Tooltip>
          <DialogTitle
            disableTypography
            className="info__title"
          >
            Calories intake</DialogTitle>
        </div>
        <DialogContent className="info__contentTable">
          <table className="table">
            <thead>
              <tr>
                <th>Activity level</th>
                <th>Kcal per day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basal Metabolic Rate</td>
                <td>{restingMifflinStJeor(userData)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 1) ? 'table__bold' : ''}>
                <td>Sedentary</td>
                <td>{kcalPerDay(1)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 2) ? 'table__bold' : ''}>
                <td>Light Exercise</td>
                <td>{kcalPerDay(2)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 3) ? 'table__bold' : ''}>
                <td>Moderate Exercise</td>
                <td>{kcalPerDay(3)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 4) ? 'table__bold' : ''}>
                <td>Heavy Exercise</td>
                <td>{kcalPerDay(4)}</td>
              </tr>
              <tr className={userActivity(lifeActivity, 5) ? 'table__bold' : ''}>
                <td>Athlete</td>
                <td>{kcalPerDay(5)}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  )
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps)(ActivityCaloriesInfo)