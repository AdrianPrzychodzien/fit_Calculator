import React from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { MifflinStJeor } from '../../util/equations'

import ActivityCaloriesInfo from '../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo'
import CustomButton from '../../util/CustomButton/CustomButton'

import './Calories.scss'

const Calories = ({ userData, history }) => {
  const { height, weight, age, sex, lifeActivity, fat } = userData


  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="calories">
        <h2 className="calories__title">Caloric needs: {MifflinStJeor(userData)} kcal</h2>
        <h4>Based on your stats, the best estimate for your maintenance calories
           is 3,577 calories per day based on the Mifflin-St Jeor Formula</h4>
        <hr />
        <h4 className="calories__text">
          Calories intake on a different activity level
          <ActivityCaloriesInfo />
        </h4>
      </div>
    )
  } else
    return (
      <div className="calories">
        <h2 className="calories__title">
          Complete informations about yourself first
      </h2>
        <div className="calories__button">
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

export default connect(mapStateToProps, mapDispatchToProps)(Calories)