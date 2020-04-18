import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from 'reactstrap';
import { activityLevel, restingMifflinStJeor } from '../../../util/equations';
import { SetUserDataInterface } from '../../../interfaces';

interface Props {
  userData: SetUserDataInterface;
}

const ActivityCaloriesInfo: React.FC<Props> = ({ userData }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const kcalPerDay = (num: number) => {
    return Math.round(restingMifflinStJeor(userData) * activityLevel(num));
  };

  const { lifeActivity } = userData;

  const userActivity = (data: number, num: number) => data === num && true;

  return (
    <div>
      <Button className='rounded' color='primary' size='sm' onClick={toggle}>
        Calories intake on different activity level
      </Button>
      <Modal isOpen={modal} toggle={toggle} className='mt-5'>
        <ModalHeader toggle={toggle}>Calories intake</ModalHeader>
        <ModalBody className='text-center'>
          <Table>
            <thead>
              <tr>
                <th>Activity level</th>
                <th>Kcal per day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basal Metabolic Rate</td>
                <td>{restingMifflinStJeor(userData)}</td>
              </tr>
              <tr
                className={
                  userActivity(lifeActivity, 1) ? 'font-weight-bold' : ''
                }
              >
                <td>Sedentary</td>
                <td>{kcalPerDay(1)}</td>
              </tr>
              <tr
                className={
                  userActivity(lifeActivity, 2) ? 'font-weight-bold' : ''
                }
              >
                <td>Light Exercise</td>
                <td>{kcalPerDay(2)}</td>
              </tr>
              <tr
                className={
                  userActivity(lifeActivity, 3) ? 'font-weight-bold' : ''
                }
              >
                <td>Moderate Exercise</td>
                <td>{kcalPerDay(3)}</td>
              </tr>
              <tr
                className={
                  userActivity(lifeActivity, 4) ? 'font-weight-bold' : ''
                }
              >
                <td>Heavy Exercise</td>
                <td>{kcalPerDay(4)}</td>
              </tr>
              <tr
                className={
                  userActivity(lifeActivity, 5) ? 'font-weight-bold' : ''
                }
              >
                <td>Athlete</td>
                <td>{kcalPerDay(5)}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ActivityCaloriesInfo;
