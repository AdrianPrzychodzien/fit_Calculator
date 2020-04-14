import React from 'react';
import { useSelector } from 'react-redux';

import { calcBMI, rangeBMI, idealBMI, userBmiTip } from '../../util/equations';

import { Button } from 'reactstrap';
import InputRange from '../../components/InputRange/InputRange';
import { State } from '../../interfaces';

const BodyFat: React.FC = ({ history }: any) => {
  const userData = useSelector((state: State) => state.data);

  const { height, weight, age, sex, lifeActivity } = userData;
  const [normalBMIMin, normalBMIMax] = idealBMI(userData);

  if (height && weight && age && sex && lifeActivity) {
    return (
      <>
        <p className='h2 text-center'>BMI Score: {calcBMI(userData)} %</p>
        <p className='h5 my-3 text-center'>
          Classified as <br /> {rangeBMI(calcBMI(userData))}
        </p>
        <hr />
        <p className='h5 my-3 text-center'>
          Healthy BMI: {normalBMIMin}kg - {normalBMIMax}kg
        </p>
        <p className='h5 my-3 text-center'>{userBmiTip(userData)}</p>

        <InputRange userData={userData} />
        <hr />

        <p className='h6 my-4 text-center'>
          Please note that BMI is not the most accurate way to measure body
          weight.
          <br />
          <br />
          It fails to take into account a person`s bone density, waist size,
          age, race and other important factors to determine obesity.
          <br />
          Trained athletes are at a great disadvantage: their excess muscle puts
          them at a higher BMI, so they may be considered obese.
          <br />
          <br />
          For more accurate informations
          <br />
          <Button
            block
            className='d-flex justify-content-center my-4'
            color='primary'
            onClick={() => history.push('bodyfat')}
          >
            go to body fat page
          </Button>
        </p>
      </>
    );
  } else
    return (
      <>
        <p className='h3 my-5 text-center'>
          Complete informations about yourself first
        </p>
        <Button
          onClick={() => history.push('./personalData')}
          block
          className='d-flex justify-content-center my-5'
          color='danger'
        >
          Go to personal data page
        </Button>
      </>
    );
};

export default BodyFat;
