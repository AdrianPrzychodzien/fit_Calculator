import React, { useState } from 'react'

import InfoIcon from '@material-ui/icons/Info'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import './FatPercentageInfo.scss'

const FatPercentageInfo = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            Fat % Categories</DialogTitle>
        </div>
        <DialogContent className="info__content">
          <table class="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Women</th>
                <th>Men</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential Fat</td>
                <td>10-12%</td>
                <td>2-4%</td>
              </tr>
              <tr>
                <td>Athletes</td>
                <td>14-20%</td>
                <td>6-13%</td>
              </tr>
              <tr>
                <td>Fitness</td>
                <td>21-24%</td>
                <td>14-17%</td>
              </tr>
              <tr>
                <td>Acceptable</td>
                <td>25-31%</td>
                <td>18-25%</td>
              </tr>
              <tr>
                <td>Obese</td>
                <td>32% +</td>
                <td>25% +</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FatPercentageInfo