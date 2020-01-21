import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import CustomButton from '../../util/CustomButton/CustomButton'

import { setFormula } from '../../redux/actions'

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
} from '../../util/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faUtensils,
  faBalanceScaleRight,
  faRunning,
  faHeartbeat
} from '@fortawesome/free-solid-svg-icons'

import './Home.scss'

const Home = ({ currentUser, userData, setFormula, history }) => {
  const [data, setData] = useState({
    localFormula: JSON.parse(localStorage.getItem('formula')) || '',
    open: false
  })

  useEffect(() => {
    localStorage.setItem('formula', JSON.stringify(data.localFormula))
  }, [data])

  const { localFormula, open } = data
  const { weight, height, age, sex, lifeActivity, fat, formula } = userData
  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData))

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleOpen = () => {
    setFormula({
      formula: localFormula
    })
    setData({ ...data, open: true })
  }

  if (currentUser) {
    return (
      <div className="homeContainer">
        <h2 className="homeContainer__title">Hello {currentUser.displayName}</h2>
        <hr />

        {(open && weight && height && age && sex && lifeActivity) ? (
          <p className="homeContainer__description">
            You are a <b>{userData.age}</b> year old <b>{(userData.sex).toLowerCase()}</b> who
               is <b>{userData.height}</b> cm tall and weights <b>{userData.weight}</b> kg
                while <b>{activityLevelComment(userData.lifeActivity)}</b>
          </p>
        ) : (
            <>
              <p className="homeContainer__description">
                Add your personal data and choose one of the following
                three equations to calculate basic indicators
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
              name='localFormula'
              value='MifflinStJeor'
              checked={localFormula === 'MifflinStJeor'}
              onChange={handleChange}
              required
            />
          </div>
          <div className="homeContainer__radio--field">
            <label>Harris Benedict</label>
            <input
              type='radio'
              name='localFormula'
              value='HarrisBenedict'
              checked={localFormula === 'HarrisBenedict'}
              onChange={handleChange}
              required
            />
          </div>
          <div className="homeContainer__radio--field">
            <label>Katch-Mcardle</label>
            <input
              type='radio'
              name='localFormula'
              value='KatchMcardle'
              checked={localFormula === 'KatchMcardle'}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <hr />
        <div className="homeContainer__button">
          {localFormula && <CustomButton onClick={handleOpen}>Calculate</CustomButton>}
        </div>

        {(open && weight && height && age && sex && lifeActivity) ? (
          <div className="results">
            <hr />
            {formula === 'KatchMcardle' && !fat && (
              <div className="homeContainer__warning">
                Katch-Mcardle BMR calculator needs body fat percentage data.
                Add them <span onClick={() => history.push('/bodyFat')}>HERE</span>
              </div>
            )}
            <div className="results__row">
              <div className="results__row--title">
                <div className="results__row--icon">
                  <FontAwesomeIcon icon={faBed} size="2x" />
                </div>
                <h4>Resting Metabolic Rate: </h4>
              </div>
              <div className="results__row--kcal">
                {formula === 'MifflinStJeor' ?
                  restingMifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                    restingHarrisBenedict(userData) : (
                      fat ? restingKatchMcardle(userData) :
                        (<div style={{ color: 'red' }}>no data</div>)))}
                {fat ? <p> kcal</p> : null}
              </div>
            </div>

            <div className="results__row">
              <div className="results__row--title">
                <div className="results__row--icon">
                  <FontAwesomeIcon icon={faUtensils} size="2x" />
                </div>
                <h4 onClick={() => history.push('/calories')}>Caloric needs:</h4>
              </div>
              <div className="results__row--kcal">
                {formula === 'MifflinStJeor' ?
                  MifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                    HarrisBenedict(userData) : (
                      fat ? KatchMcardle(userData) :
                        (<div style={{ color: 'red' }}>no data</div>)))}
                {fat ? <p> kcal</p> : null}
              </div>
            </div>

            <div className="results__row">
              <div className="results__row--title">
                <div onClick={() => history.push('/bmi')} className="results__row--icon">
                  <FontAwesomeIcon icon={faBalanceScaleRight} size="2x" />
                </div>
                <h4 onClick={() => history.push('/bmi')}>BMI:</h4>
              </div>
              <div>
                <b>
                  {calcBMI(userData)}, {rangeBMI(calcBMI(userData))}
                </b>
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
                <b>
                  {maxHeartRate(userData)}
                </b>
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
                <b>
                  {trainingMin} - {trainingMax}
                </b>
              </div>
            </div>
          </div>
        ) : (
            open && (
              <div className="homeContainer__warning">
                Complete data first!
            </div>
            )
          )
        }
      </div>
    )
  } else {
    return (
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
    )
  }
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setFormula: data => dispatch(setFormula(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)