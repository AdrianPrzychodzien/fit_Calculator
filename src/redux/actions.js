export const signUpUser = (userCredentials) => dispatch => {
  dispatch({
    type: 'SIGN_UP_USER',
    payload: userCredentials
  })
}