import React from 'react'
import { connect } from 'react-redux'

import { MifflinStJeor, HarrisBenedict, KatchMcardle } from '../../util/equations'

import ActivityCaloriesInfo from '../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo'
import Macronutrients from '../../components/Tabs/Macronutrients/Macronutrients'

import { Button } from 'reactstrap'

const Calories = ({ userData, history }) => {

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  const formulaOption = formula === 'MifflinStJeor' ?
    MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
      HarrisBenedict(userData) : KatchMcardle(userData)

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <>
        <p className="h2 text-center">Caloric needs: {formulaOption}kcal</p>
        <p className="h6 text-center my-3">
          Based on your stats, the best estimate for your maintenance calories
           is {formulaOption} calories per day based on the
          {formula === 'MifflinStJeor' ? ' Mifflin - St Jeor ' : formula === 'HarrisBenedict' ?
            ' Harris Benedict ' : ' Katch-Mcardle '}
          Formula
           </p>
        <hr />

        <div className="h5 d-flex text-center align-items-center">
          Calories intake on a different activity level
            <ActivityCaloriesInfo userData={userData} />
        </div>
        <hr />

        <p className="h2 text-center mb-3">Macronutrients</p>

        <Macronutrients />
      </>
    )
  } else
    return (
      <>
        <p className="h2 text-center">
          Complete informations about yourself first
        </p>
        <Button color="danger" block className="d-flex justify-content-center my-5"
          onClick={() => history.push('./personalData')}
        >
          Go to personal data page
        </Button>
      </>
    )
}

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Calories)