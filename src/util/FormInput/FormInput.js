import React from 'react'
import { FormInputContainer, FormInput } from './FormInput.styles'

const FormInput = ({ classes, handleChange, label, ...otherProps }) => (
  <FormInputContainer>
    <FormInput
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
  </FormInputContainer>
)

export default FormInput