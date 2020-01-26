import React from 'react'
import { connect } from 'react-redux'

import { setFatData } from '../../redux/actions'
import { calcBMI, rangeBMI, idealBMI, userBmiTip } from '../../util/equations'

import { Button } from 'reactstrap'
import InputRange from '../../components/InputRange/InputRange'

const BodyFat = ({ userData, history }) => {

  const { height, weight, age, sex, lifeActivity, fat } = userData
  const [normalBMIMin, normalBMIMax] = idealBMI(userData)

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <>
        <p className="h2 text-center">BMI Score: {calcBMI(userData)} %</p>
        <p className="h5 text-center">which means you are classified as {rangeBMI(calcBMI(userData))}</p>
        <hr />
        <p className="h5 text-center">Healthy BMI range: {normalBMIMin}kg - {normalBMIMax}kg</p>
        <p className="h5 text-center my-3">{userBmiTip(userData)}</p>

        <InputRange userData={userData} />
        <hr />

        <p className="h6 text-center">
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
          <Button
            block className="d-flex justify-content-center my-3" color="danger"
            onClick={() => history.push('bodyfat')}
          >
            go to body fat page
            </Button>
        </p>
      </>
    )
  } else
    return (
      <>
        <p className="h3 my-5 text-center">
          Complete informations about yourself first
        </p>
        <Button
          onClick={() => history.push('./personalData')}
          block className="d-flex justify-content-center my-5" color="danger"
        >
          go to personal data page
          </Button>
      </>
    )
}

const mapStateToProps = ({ user, data }) => ({
  currentUser: user.currentUser,
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)