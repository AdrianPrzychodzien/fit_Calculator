import React, { useState } from 'react'
import { connect } from 'react-redux'

import { calcBMI, MifflinStJeor, HarrisBenedict, rangeBMI } from '../util/equations'

import './Home.scss'

const Home = ({ currentUser, userData }) => {
  const [equation, setEquation] = useState({
    formula: 'MifflinStJeor'
  })

  const { formula } = equation

  const handleChange = e => {
    const { name, value } = e.target
    setEquation({ [name]: value })
  }

  return (
    <>
      {currentUser ? (
        <div className="homeContainer">
          <h2 className="homeContainer__title">Hello {currentUser.displayName}</h2>
          <div className="homeContainer__radio">
            <h3>BMR equation:</h3>
            <div className="homeContainer__radio--field">
              <label>Mifflin - St Jeor</label>
              <input
                type='radio'
                name='formula'
                value='MifflinStJeor'
                checked={formula === 'MifflinStJeor'}
                onChange={handleChange}
                required
              />
            </div>
            <div className="homeContainer__radio--field">
              <label>Harris Benedict</label>
              <input
                type='radio'
                name='formula'
                value='HarrisBenedict'
                checked={formula === 'HarrisBenedict'}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <p>
            Your BMR is {formula === 'MifflinStJeor' ? MifflinStJeor(userData) : HarrisBenedict(userData)} kcal
            <br />
            Your BMI is {calcBMI(userData)}, {rangeBMI(calcBMI(userData))}
          </p>
        </div>
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