import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { State } from '../../../interfaces/interfaces';

const FatPercentageInfo: React.FC = () => {
  const userData = useSelector((state: State) => state.data);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        className='rounded mb-0 ml-2'
        color='primary'
        size='sm'
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faInfo} size='sm' />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className='mt-5'>
        <ModalHeader toggle={toggle}>Fat % Categories</ModalHeader>
        <ModalBody className='text-center'>
          <Table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Women</th>
                <th>Men</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential Fat</td>
                <td>10-13%</td>
                <td>2-5%</td>
              </tr>
              <tr>
                <td>Athletes</td>
                <td>14-20%</td>
                <td>6-13%</td>
              </tr>
              <tr>
                <td>Fitness</td>
                <td>21-24%</td>
                <td>14-17%</td>
              </tr>
              <tr>
                <td>Acceptable</td>
                <td>25-31%</td>
                <td>18-24%</td>
              </tr>
              <tr>
                <td>Obese</td>
                <td>32%+</td>
                <td>25%+</td>
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

export default FatPercentageInfo;
