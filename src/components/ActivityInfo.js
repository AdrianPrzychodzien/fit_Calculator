import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import StarIcon from '@material-ui/icons/Star';
import { Dialog, Tooltip, DialogTitle, DialogContent } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import './ActivityInfo.scss'

const ActivityInfo = () => {
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
      <Dialog className="info" open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" onClose={handleClose} className="info__close">
          <CloseIcon fontSize="large" />
        </Tooltip>
        <DialogTitle fontSize="large" >Activity levels</DialogTitle>
        <DialogContent className="info__content">
          <div>
            <p><StarIcon /><br />
              I am sedentary (little or no exercise)</p>
          </div>
          <div>
            <p><StarIcon /><StarIcon /><br />
              I am lightly active (light exercise or sports 1-3 days per week)</p>
          </div>
          <div>
            <p><StarIcon /><StarIcon /><StarIcon /><br />
              I am moderately active (moderate exercise or sports 3-5 days per week)</p>
          </div>
          <div>
            <p><StarIcon /><StarIcon /><StarIcon /><StarIcon /><br />
              I am very active (hard exercise or sports 6-7 days per week)</p>
          </div>
          <div>
            <p><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><br />
              I am super active (very hard exercise or sports and a physical job)</p>
          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default ActivityInfo