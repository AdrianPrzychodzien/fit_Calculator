import React from 'react'
import { connect } from 'react-redux'

import { calcBMI, MifflinStJeor, HarrisBenedict } from '../util/equations'

const Home = ({ currentUser, userData }) => {

  console.log(userData)


  return (
    <>
      {currentUser ? (
        <>
          <p>Hello {currentUser.displayName}, how are you?</p>
          <br />
          <p>
            Your BMR is {MifflinStJeor(userData)} kcal
            <br />
            Your BMI is {calcBMI(userData)}
          </p>
        </>
      ) : (
          <p>Login in first, please!</p>
        )}
    </>
  )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

export default connect(mapStateToProps)(Home)