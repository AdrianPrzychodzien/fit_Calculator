import React from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { calcBMI, rangeBMI, idealBMI, userBmiTip } from '../../util/equations'

import CustomButton from '../../util/CustomButton/CustomButton'

import './Bmi.scss'

const BodyFat = ({ userData, history }) => {
  const { height, weight, age, sex, lifeActivity, fat } = userData
  const [normalBMIMin, normalBMIMax] = idealBMI(userData)

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="bmi">
        <h2 className="bmi__title">BMI Score: {calcBMI(userData)} %</h2>
        <h4>which means you are classified as {rangeBMI(calcBMI(userData))}</h4>
        <hr />
        <h4>Healthy BMI range: {normalBMIMin}kg - {normalBMIMax}kg</h4>
        <h4>{userBmiTip(userData)}</h4>
        <div className="input__range">
          <div className="description">
            <p>Underweight</p>
            <p>Normal</p>
            <p>OverWeight</p>
            <p>Obesity</p>
          </div>
          <input type="range" min="15" max="35" value={calcBMI(userData)} readOnly />
        </div>
        <hr />

        <h5>
          Please note that BMI is not the most
          accurate way to measure body weight.
          <br /><br />
          It fails to take into account a person`s bone density,
          waist size, age, race and other important factors
          to determine obesity.
          <br />
          Trained athletes are at a great disadvantage:
          their excess muscle puts them at a higher BMI,
          so they may be considered obese.
          <br /><br />
          For more accurate informations
          <br />
          <span onClick={() => history.push('bodyfat')} style={{ color: 'red' }}>
            go to body fat page
            </span>
        </h5>
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