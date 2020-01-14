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
  restingHarrisBenedict
} from '../util/equations'

import './Home.scss'

const Home = ({ currentUser, userData }) => {
  const [data, setData] = useState({
    formula: 'MifflinStJeor',
    open: false
  })

  const { formula, open } = data

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
                <h4>Resting Metabolic Rate: </h4>
                <div>
                  {formula === 'MifflinStJeor' ? restingMifflinStJeor(userData) : restingHarrisBenedict(userData)} kcal
                </div>
              </div>
              <div className="results__row">
                <h4>BMR:</h4>
                <div>
                  {formula === 'MifflinStJeor' ? MifflinStJeor(userData) : HarrisBenedict(userData)} kcal
                </div>
              </div>
              <div className="results__row">
                <h4>BMI: </h4>
                <div>
                  {calcBMI(userData)}, {rangeBMI(calcBMI(userData))}
                </div>
              </div>
              <div className="results__row">
                <h4>Training Heart Rate: </h4>
                <div>
                  ...
                </div>
              </div>
              <div className="results__row">
                <h4>Heart Rate Max: </h4>
                <div>
                  ...
                </div>
              </div>
              {/* TODO: FA ICONS, Body fat input in personalData
              separate actions in personalData,
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