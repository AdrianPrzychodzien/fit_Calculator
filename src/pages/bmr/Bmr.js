import React from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { calcBMI } from '../../util/equations'

import CustomButton from '../../util/CustomButton/CustomButton'

import './Bmr.scss'

const BasalMetabolicRate = ({ userData, history }) => {
  const { height, weight, age, sex, lifeActivity, fat } = userData


  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="bmr">
        <h2 className="bmr__title">BMR Score: {calcBMI(userData)} %</h2>
        <h4>Based on your stats, the best estimate for your maintenance calories
           is 3,577 calories per day based on the Mifflin-St Jeor Formula</h4>
        <hr />
      </div>
    )
  } else
    return (
      <div className="bmr">
        <h2 className="bmr__title">
          Complete informations about yourself first
      </h2>
        <div className="bmr__button">
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

export default connect(mapStateToProps, mapDispatchToProps)(BasalMetabolicRate)