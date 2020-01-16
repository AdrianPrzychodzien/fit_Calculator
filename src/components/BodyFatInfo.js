import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import StarIcon from '@material-ui/icons/Star';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import './BodyFatInfo.scss'

const BodyFatInfo = () => {
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
            Body fat info</DialogTitle>
        </div>
        <DialogContent className="info__content">
          <div>
            You can check your body fat percentage by using skinfold caliper, but
             the most commonly used estimation formula in body fat
            percentage calculations is the U.S. Navy fitness formula
            </div>
          <div>
            Calculation require giving body measurements in specific areas
            </div>
          <div>
            You can add them <span>here</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BodyFatInfo