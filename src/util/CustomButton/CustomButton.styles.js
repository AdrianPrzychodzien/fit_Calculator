import styled, { css } from 'styled-components'

const buttonStyles = css`
  background-color: rgb(8, 95, 255);
  color: white;
  border: none;

&:hover {
  background-color: #e2efff;
  color: black;
  border: 1px solid black;
}`

const invertedButtonStyles = css`
  background-color: #e2efff;
  color: black;
  border: 1px solid black;

&:hover {
  background-color: rgb(8, 95, 255);
  color: white;
  border: none;
}`

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

&:hover {
  background-color: #357ae8;
  border: none;
}`

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles
  }

  return props.inverted ? invertedButtonStyles : buttonStyles
}

export const CustomButtonContainer = styled.button`
  min-width: 100px;
  width: auto;
  height: 40px;
  letter-spacing: 0.3px;
  line-height: 40px;
  padding: 0 15px 0 15px;
  font-size: 15px;
  border-radius: 10px;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center
&:focus {
  outline: none
}

${getButtonStyles}
`

CustomButtonContainer.displayName = 'CustomButtonContainer'