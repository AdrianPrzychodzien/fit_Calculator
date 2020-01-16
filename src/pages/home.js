import React, { useState } from 'react'
import { connect } from 'react-redux'

import CustomButton from '../util/CustomButton/CustomButton'

import {
  activityLevelComment,
  calcBMI,
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  rangeBMI,
  restingMifflinStJeor,
  restingHarrisBenedict,
  restingKatchMcardle,
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

const Home = ({ currentUser, userData, history }) => {
  const [data, setData] = useState({
    formula: 'MifflinStJeor',
    open: false
  })

  const { formula, open } = data
  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData))

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleOpen = () => {
    setData({ ...data, open: true })
  }

  return (
    <>
      {currentUser ? (
        <div className="homeContainer">
          <h2 className="homeContainer__title">Hello {currentUser.displayName}</h2>
          <hr />

          {open ? (
            <p className="homeContainer__description">
              You are a <b>{userData.age}</b> year old <b>{(userData.sex).toLowerCase()}</b> who
               is <b>{userData.height}</b> cm tall and weights <b>{userData.weight}</b> kg
                while <b>{activityLevelComment(userData.lifeActivity)}</b>
            </p>
          ) : (
              <>
                <p className="homeContainer__description">
                  Add your personal data and choose one of the following
                  two equations to calculate basic indicators
                  (Resting Metabolic Rate, Body Mass Index,
                  Training Heart Rate or Heart Rate Max </p>
                <div className="homeContainer__button">
                  <CustomButton onClick={() => history.push('/personalData')}>Add personal data</CustomButton>
                </div>
                <br />
              </>
            )}

          <div className="homeContainer__radio">
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
            <div className="homeContainer__radio--field">
              <label>Katch-Mcardle</label>
              <input
                type='radio'
                name='formula'
                value='KatchMcardle'
                checked={formula === 'KatchMcardle'}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <hr />
          <div className="homeContainer__button">
            <CustomButton onClick={handleOpen}>Calculate</CustomButton>
          </div>

          {open && (
            <div className="results">
              <hr />
              <div className="results__row">
                <div className="results__row--title">
                  <div className="results__row--icon">
                    <FontAwesomeIcon icon={faBed} size="2x" />
                  </div>
                  <h4>Resting Metabolic Rate: </h4>
                </div>
                <div>
                  {formula === 'MifflinStJeor' ?
                    restingMifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                      restingHarrisBenedict(userData) : restingKatchMcardle(userData))} kcal
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
                  {formula === 'MifflinStJeor' ?
                    MifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                      HarrisBenedict(userData) : KatchMcardle(userData))} kcal
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
            </div>
          )}
        </div>
      ) : (
          <div className="homeContainer">
            <br />
            <h2 className="homeContainer__title">
              Login in first, please!
              </h2>
            <br />
            <br />
            <div className="homeContainer__button">
              <CustomButton onClick={() => history.push('/signin')}>Go TO LOGIN PAGE</CustomButton>
            </div>
          </div>
        )}
    </>
  )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

export default connect(mapStateToProps)(Home)