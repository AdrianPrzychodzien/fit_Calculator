import React from 'react'
import PropTypes from 'prop-types'

import ActivitInfo from '../../components/Info/ActivityInfo/ActivityInfo'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { Field, useField } from 'formik'
import { TextField, Radio, FormControlLabel } from '@material-ui/core'

import './FormikFunctions.css'

const renderStar = isFull => {
  const icon = isFull ? faStar : regularStar;
  return <FontAwesomeIcon icon={icon} size="2x" />;
}

const Star = ({ isFull, onClick }) => (
  <span className='star' onClick={onClick}>
    {renderStar(isFull)}
  </span>
)

const Stars = ({ count, handleClick }) => (
  <span className='stars'>
    {[...Array(5).keys()].map(i => (
      <Star key={i} isFull={i < count} onClick={() => handleClick(i + 1)} />
    ))}
  </span>
)

Stars.defaultProps = {
  count: 1,
  handleClick: e => e
}

export const StarsInput = ({ fieldName }) => (
  <Field name={fieldName} id={fieldName} type="number">
    {({ field: { value }, form: { setFieldValue } }) => (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <label className="h4 d-flex align-items-center">
          Life Activity
          <ActivitInfo />
        </label>
        <div>
          <Stars
            count={value}
            handleClick={number => setFieldValue(fieldName, number)}
          />
        </div>
      </div>
    )}
  </Field>
)

export const MyRadioFormula = ({ label, ...props }) => {
  const [field] = useField(props)

  return (
    <label>{label} <br />
      <FormControlLabel className="d-flex justify-content-center ml-2" {...field} control={<Radio />} />
    </label>
  )
}

export const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props)

  return (
    <FormControlLabel {...field} control={<Radio />} label={label} />
  )
}

MyRadio.propTypes = {
  label: PropTypes.string.isRequired
}

export const MyTextField = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  )
}