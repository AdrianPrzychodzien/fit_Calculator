import React, { useState } from 'react'
import { connect } from 'react-redux'

import { setFatData, setFatPercentage } from '../../redux/actions'
import { MifflinStJeor, HarrisBenedict, KatchMcardle, ModerateCarb, LowCarb, HighCarb } from '../../util/equations'

import ActivityCaloriesInfo from '../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo'
import CustomButton from '../../util/CustomButton/CustomButton'

import './Calories.scss'

const Calories = ({ userData, history }) => {
  const [data, setData] = useState({
    diet: 'Maintenance'
  })

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  const formulaOption = formula === 'MifflinStJeor' ?
    MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
      HarrisBenedict(userData) : KatchMcardle(userData)

  const kcalAmount = data.diet === 'Maintenance' ?
    formulaOption : data.diet === 'Cutting' ?
      formulaOption - 500 : formulaOption + 500

  const [proteinModerate, carbsModerate, fatsModerate] = ModerateCarb(kcalAmount)
  const [proteinLow, carbsLow, fatsLow] = LowCarb(kcalAmount)
  const [proteinHigh, carbsHigh, fatsHigh] = HighCarb(kcalAmount)

  const tabItems = document.querySelectorAll('.tab--item')
  const tabContentItems = document.querySelectorAll('.tabContent--item')

  tabItems.forEach(item => item.addEventListener('click', selectItem))
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

  function removeBorder() {
    tabItems.forEach(item => item.classList.remove('tab--border'))
  }

  function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'))
  }

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <div className="calories">
        <h2 className="calories__title">Caloric needs: {formulaOption} kcal</h2>
        <h4>
          Based on your stats, the best estimate for your maintenance calories
           is {formulaOption} calories per day based on the
          {formula === 'MifflinStJeor' ? ' Mifflin - St Jeor ' : formula === 'HarrisBenedict' ?
            ' Harris Benedict ' : ' Katch-Mcardle '}
          Formula
           </h4>
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
            <div onClick={() => setData({ diet: 'Maintenance' })}
              id="tab--1"
              className="tab--item tab--border"
            >
              Maintenance
            </div>
            <div onClick={() => setData({ diet: 'Cutting' })}
              id="tab--2"
              className="tab--item"
            >
              Cutting
            </div>
            <div onClick={() => setData({ diet: 'Bulking' })}
              id="tab--3"
              className="tab--item"
            >
              Bulking
            </div>
          </div>
        </div>
        <div className="tabContent">
          <div className="tabContent__container">
            {/* Tab Content 1 - Maintenance */}
            <div id="tab--1--content" className="tabContent--item show">
              <h5>These macronutrient values reflect your
              maintenance calories of {formulaOption} kcal per day.</h5>

              <table className="tabContent__table">
                <thead>
                  <tr>
                    <th>Macro</th>
                    <th>Moderate Carb</th>
                    <th>Low Carb</th>
                    <th>High Carb</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Protein</td>
                    <td>{proteinModerate}g</td>
                    <td>{proteinLow}g</td>
                    <td>{proteinHigh}g</td>
                  </tr>
                  <tr >
                    <td>Carbs</td>
                    <td>{carbsModerate}g</td>
                    <td>{carbsLow}g</td>
                    <td>{carbsHigh}g</td>
                  </tr>
                  <tr >
                    <td>Fats</td>
                    <td>{fatsModerate}g</td>
                    <td>{fatsLow}g</td>
                    <td>{fatsHigh}g</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tab Content 2 - Cutting */}
            <div id="tab--2--content" className="tabContent--item">
              <h5>These macronutrient values reflect your
                cutting calories of {formulaOption - 500} kcal per day,
                which is a 500 calorie deficit from
              your maintenance of {formulaOption} calories.</h5>

              <table className="tabContent__table">
                <thead>
                  <tr>
                    <th>Macro</th>
                    <th>Moderate Carb</th>
                    <th>Low Carb</th>
                    <th>High Carb</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Protein</td>
                    <td>{proteinModerate}g</td>
                    <td>{proteinLow}g</td>
                    <td>{proteinHigh}g</td>
                  </tr>
                  <tr >
                    <td>Carbs</td>
                    <td>{carbsModerate}g</td>
                    <td>{carbsLow}g</td>
                    <td>{carbsHigh}g</td>
                  </tr>
                  <tr >
                    <td>Fats</td>
                    <td>{fatsModerate}g</td>
                    <td>{fatsLow}g</td>
                    <td>{fatsHigh}g</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tab Content 3 - Bulking */}
            <div id="tab--3--content" className="tabContent--item">
              <h5>These macronutrient values reflect your
                bulking calories of {formulaOption + 500} kcal per day,
                which is +500 calories from
               your maintenance of {formulaOption} calories.</h5>

              <table className="tabContent__table">
                <thead>
                  <tr>
                    <th>Macro</th>
                    <th>Moderate Carb</th>
                    <th>Low Carb</th>
                    <th>High Carb</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Protein</td>
                    <td>{proteinModerate}g</td>
                    <td>{proteinLow}g</td>
                    <td>{proteinHigh}g</td>
                  </tr>
                  <tr >
                    <td>Carbs</td>
                    <td>{carbsModerate}g</td>
                    <td>{carbsLow}g</td>
                    <td>{carbsHigh}g</td>
                  </tr>
                  <tr >
                    <td>Fats</td>
                    <td>{fatsModerate}g</td>
                    <td>{fatsLow}g</td>
                    <td>{fatsHigh}g</td>
                  </tr>
                </tbody>
              </table>
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