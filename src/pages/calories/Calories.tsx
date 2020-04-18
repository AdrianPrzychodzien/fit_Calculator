import React from 'react';
import { useSelector } from 'react-redux';

import {
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle
} from '../../util/equations';

import ActivityCaloriesInfo from '../../components/Info/ActivityCaloriesInfo/ActivityCaloriesInfo';
import Macronutrients from '../../components/Tabs/Macronutrients/Macronutrients';
import { Button } from 'reactstrap';

import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { State } from '../../interfaces/interfaces';

interface Props extends RouteComponentProps {
  history: History;
}

const Calories: React.FC<Props> = ({ history }) => {
  const userData = useSelector((state: State) => state.data);

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData;

  const formulaOption =
    formula === 'MifflinStJeor'
      ? MifflinStJeor(userData)
      : formula === 'HarrisBenedict'
      ? HarrisBenedict(userData)
      : KatchMcardle(userData);

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <>
        <p className='h2 text-center'>Caloric needs: {formulaOption}kcal</p>
        <p className='h5 text-center my-3'>
          The best estimate for your maintenance calories is {formulaOption} per
          day based on the
          {formula === 'MifflinStJeor'
            ? ' Mifflin - St Jeor '
            : formula === 'HarrisBenedict'
            ? ' Harris Benedict '
            : ' Katch-Mcardle '}
          Formula
        </p>
        <hr />

        <div className='d-flex justify-content-center my-3'>
          <ActivityCaloriesInfo userData={userData} />
        </div>
        <hr />

        <p className='h2 text-center mb-3'>Macronutrients</p>

        <Macronutrients />
      </>
    );
  } else
    return (
      <>
        <p className='h2 text-center'>
          Complete informations about yourself first
        </p>
        <Button
          color='danger'
          block
          className='d-flex justify-content-center my-5'
          onClick={() => history.push('./personalData')}
        >
          Go to personal data page
        </Button>
      </>
    );
};

export default Calories;
