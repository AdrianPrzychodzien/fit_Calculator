import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import InfoIcon from '@material-ui/icons/Info'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import './BodyFatInfo.scss'

const BodyFatInfo = ({ history }) => {
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
            You can check your body fat percentage by using <b>skinfold caliper</b>, but
             the most commonly used estimation formula in body fat
            percentage calculations is the <b>U.S. Navy fitness formula</b>
          </div>
          <br />
          <div>
            Calculation require giving body measurements in specific areas
            </div>
          <br />
          <div>
            You can add them <span onClick={() => history.push('/bodyFat')}>here</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default withRouter(BodyFatInfo)