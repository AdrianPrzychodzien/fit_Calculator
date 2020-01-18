import React, { useState } from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { calcBMI, rangeBMI } from '../../util/equations'

import CustomButton from '../../util/CustomButton/CustomButton'

import './Bmi.scss'

const BodyFat = ({ userData, history }) => {
  const { height, weight, age, sex, lifeActivity, fat } = userData
  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="bmi">
        <h2 className="bmi__title">BMI Score: {calcBMI(userData)} %</h2>
        <h4>which means you are classified as {rangeBMI(calcBMI(userData))}</h4>
        <hr />
        <div className="bmi__range">
          <div className="description">
            <p>Underweight</p>
            <p>Normal</p>
            <p>OverWeight</p>
            <p>Obesity</p>
          </div>
          <input type="range" min="15" max="35" value={calcBMI(userData)} readOnly />
        </div>
        <hr />

        <div className="bmi__result">
          <h2 className="bmi__result--title">
          </h2>
        </div>
      </div>
    )
  } else
    return (
      <div className="bmi">
        <h2 className="bmi__title">
          Complete informations about yourself first
      </h2>
        <div className="bmi__button">
          <CustomButton
            onClick={() => history.push('./personalData')}
          >
            Go to personal data page
          </CustomButton>
        </div>
      </div>
    )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data)),
  setFatPercentage: data => dispatch(setFatPercentage(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)