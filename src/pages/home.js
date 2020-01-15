import React, { useState } from 'react'
import { connect } from 'react-redux'

import CustomButton from '../util/CustomButton/CustomButton'

import {
  activityLevelComment,
  calcBMI,
  MifflinStJeor,
  HarrisBenedict,
  rangeBMI,
  restingMifflinStJeor,
  restingHarrisBenedict,
  trainingHeartRate,
  maxHeartRate
} from '../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faUtensils,
  faBalanceScaleRight,
  faRunning,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons'


import './Home.scss'

const Home = ({ currentUser, userData }) => {
  const [data, setData] = useState({
    formula: 'MifflinStJeor',
    open: true
  })

  const { formula, open } = data
  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData))

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleOpen = () => {
    setData({ open: !open })
  }

  return (
    <>
      {currentUser ? (
        <div className="homeContainer">
          <h2 className="homeContainer__title">Hello {currentUser.displayName}</h2>

          {open ? (
            <p className="homeContainer__description">
              You are a <b>{userData.age}</b> year old <b>{(userData.sex).toLowerCase()}</b> who
               is <b>{userData.height}</b> cm tall and weights <b>{userData.weight}</b> kg
                while <b>{activityLevelComment(userData.lifeActivity)}</b>
            </p>
          ) : (
              <p className="homeContainer__description">
                Add your personal data and choose one of the following
                two equations to calculate basic indicators
                (Resting Metabolic Rate, Body Mass Index,
              Training Heart Rate or Heart Rate Max </p>
            )}

          <div className="homeContainer__radio">
            <h3>BMR equation:</h3>
            <div>
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
            <div>
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
          <br />
          <div className="homeContainer__button">
            <CustomButton onClick={handleOpen}>Calculate</CustomButton>
          </div>

          {open && (
            <div className="results">
              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faBed} size="2x" />
                  </div>
                  <h4>Resting Metabolic Rate: </h4>
                </div>
                <div>
                  {formula === 'MifflinStJeor' ? restingMifflinStJeor(userData) : restingHarrisBenedict(userData)} kcal
                </div>
              </div>

              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faUtensils} size="2x" />
                  </div>
                  <h4>BMR:</h4>
                </div>
                <div>
                  {formula === 'MifflinStJeor' ? MifflinStJeor(userData) : HarrisBenedict(userData)} kcal
                </div>
              </div>

              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faBalanceScaleRight} size="2x" />
                  </div>
                  <h4>BMI:</h4>
                </div>
                <div>
                  {calcBMI(userData)}, {rangeBMI(calcBMI(userData))}
                </div>
              </div>

              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faHeartbeat} size="2x" />
                  </div>
                  <h4>Maximum Heart Rate: </h4>
                </div>
                <div>

                  {maxHeartRate(userData)}
                </div>
              </div>

              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faRunning} size="2x" />
                  </div>
                  <h4>Training Heart Rate: </h4>
                </div>
                <div>
                  {trainingMin} - {trainingMax}
                </div>
              </div>



              {/* , separate actions in personalData,
              customButton hover (white background),
              css transformations in home.js on button click
              */}

            </div>

          )}
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