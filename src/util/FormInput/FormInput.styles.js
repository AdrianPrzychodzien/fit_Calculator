import styled, { css } from 'styled-components'

export const FormInputContainer = styled.div`
  position: relative;
  margin: 25px 0;
`

export const FormInput = styled.input`
  background: none;
  background-color: white;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 10;
  border-bottom: 2px solid grey;
  margin: 10px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    @include shrinkLabel();
  }

  & [type="password"]: {
    letterSpacing: 0.3em;
  },
`