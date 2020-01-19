import React from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { MifflinStJeor } from '../../util/equations'

import ActivityCaloriesInfo from '../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo'
import CustomButton from '../../util/CustomButton/CustomButton'

import './Calories.scss'

const Calories = ({ userData, history }) => {
  const { height, weight, age, sex, lifeActivity, fat } = userData

  const tabItems = document.querySelectorAll('.tab--item')
  const tabContentItems = document.querySelectorAll('.tabContent--item')

  // Select tab content item
  function selectItem(e) {
    removeBorder()
    removeShow()
    // Add border to current tab
    this.classList.add('tab--border')
    // Grab content item from DOM
    const tabContentItem = document.querySelector(`#${this.id}--content`)
    // Add show class
    tabContentItem.classList.add('show')
  }

  const removeBorder = () => {
    tabItems.forEach(item => item.classList.remove('tab--border'))
  }

  const removeShow = () => {
    tabContentItems.forEach(item => item.classList.remove('show'))
  }

  tabItems.forEach(item => item.addEventListener('click', selectItem))

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="calories">
        <h2 className="calories__title">Caloric needs: {MifflinStJeor(userData)} kcal</h2>
        <h4>Based on your stats, the best estimate for your maintenance calories
           is 3,577 calories per day based on the Mifflin-St Jeor Formula</h4>
        <hr />
        <h4 className="calories__text">
          Calories intake on a different activity level
          <div className="calories__icon">
            <ActivityCaloriesInfo />
          </div>
        </h4>
        <hr />

        <h2 className="calories__title">Macronutrients</h2>
        <div className="tabs">
          <div className="container">
            <div id="tab--1" className="tab--item tab--border">
              Maintenance
            </div>
            <div id="tab--2" className="tab--item">
              Cutting
            </div>
            <div id="tab--3" className="tab--item">
              Bulking
            </div>
          </div>
        </div>
        <div className="tabContent">
          <div className="tabContent__container">
            {/* Tab Content 1 */}
            <div id="tab--1--content" className="tabContent--item show">
              <h5>These macronutrient values reflect your
              maintenance calories of ... calories per day.</h5>
              ...table1
            </div>

            {/* Tab Content 2 */}
            <div id="tab--2--content" className="tabContent--item">
              <h5>These macronutrient values reflect your
                cutting calories of ... calories per day,
                which is a 500 calorie per day deficit from
              your maintenance of ... calories per day.</h5>
              ...table2
            </div>

            {/* Tab Content 3 */}
            <div id="tab--3--content" className="tabContent--item">
              <h5>These macronutrient values reflect your
                bulking calories of ... calories per day,
                 which is +500 calories per day from
               your maintenance of ... calories per day.</h5>
              ...table3
            </div>
          </div>
        </div>
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