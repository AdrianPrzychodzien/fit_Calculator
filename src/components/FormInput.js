import React from 'react'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  ...theme.formInput
})

const FormInput = ({ classes, handleChange, label, ...otherProps }) => (
  <div className={classes.formInput}>
    <div className='group'>
      <input
        className='form-input'
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label className={`${otherProps.value.length ? 'shrink' : ''}
      form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  </div>
)

export default withStyles(styles)(FormInput)