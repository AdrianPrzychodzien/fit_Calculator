import React from 'react';
import ActivitInfo from '../../components/Info/ActivityInfo/ActivityInfo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

import { Field, useField } from 'formik';
import { TextField, Radio, FormControlLabel } from '@material-ui/core';
import {
  StarProps,
  StarsProps,
  StarsInputProps,
  MyRadioProps,
  MyTextFieldProps,
  FieldProps
} from '../../interfaces/formikInterfaces';

import './FormikFunctions.scss';

const Star: React.FC<StarProps> = ({ isFull, onClick }) => {
  const icon = isFull ? faStar : regularStar;
  return (
    <span className='star' onClick={onClick}>
      {<FontAwesomeIcon icon={icon} size='2x' />}
    </span>
  );
};

const Stars: React.FC<StarsProps> = ({ count, handleClick }) => (
  <span className='stars'>
    {[...Array(5).keys()].map((i) => (
      <Star key={i} isFull={i < count} onClick={() => handleClick(i + 1)} />
    ))}
  </span>
);

export const StarsInput: React.FC<StarsInputProps> = ({ fieldName }) => (
  <Field name={fieldName} id={fieldName} type='number'>
    {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <label className='h4 d-flex align-items-center'>
          Life Activity
          <ActivitInfo />
        </label>
        <div>
          <Stars
            count={value}
            handleClick={(number: number) => setFieldValue(fieldName, number)}
          />
        </div>
      </div>
    )}
  </Field>
);

export const MyRadioFormula: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <FormControlLabel
      label={label}
      className='d-flex justify-content-center ml-2'
      {...field}
      control={<Radio />}
    />
  );
};

export const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export const MyTextField: React.FC<MyTextFieldProps> = ({
  type,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
