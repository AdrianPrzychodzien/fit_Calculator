import React, { MouseEvent } from 'react';

export interface StarProps {
  isFull: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface StarsProps {
  count: number;
  handleClick: (number: number) => void;
}

export interface StarsInputProps {
  fieldName: string;
}

export interface FieldProps {
  field: { name: string; value: number };
  form: { setFieldValue: (fieldName: string, number: number) => void };
}

export interface MyRadioProps {
  type: string;
  name: string;
  value: string;
  label: string;
}

export interface MyTextFieldProps {
  type: string;
  placeholder: string;
  name: string;
  as: string | React.ComponentType | React.ForwardRefExoticComponent<any>;
}
