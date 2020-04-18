import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Fade
} from 'reactstrap';

interface Props {
  clearGoal: () => void;
  clearGoalSaveWeights: () => void;
  clearFinish: () => void;
  className: string;
}

const DeleteGoalInfo: React.FC<Props> = ({
  clearGoal,
  clearGoalSaveWeights,
  clearFinish,
  className
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleFade = () => setFadeIn(!fadeIn);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button size='sm' onClick={toggleFade}>
        Delete actual goal and set new
      </Button>
      <Fade in={fadeIn} tag='h6' className='mt-3'>
        <div className='d-flex justify-content-center align-items-center'>
          Are you sure?
          <Button className='ml-2' size='sm' color='danger' onClick={toggle}>
            Delete
          </Button>
        </div>
      </Fade>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
        <ModalBody className='text-center'>
          <div>
            You will lose saved information about your weight, as well as start
            and finish date from your actual goal.
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='warning'
            onClick={() => {
              clearGoalSaveWeights();
              toggleFade();
              toggle();
            }}
          >
            Delete but leave weights
          </Button>{' '}
          <Button
            color='danger'
            onClick={() => {
              clearGoal();
              toggleFade();
              toggle();
            }}
          >
            Delete
          </Button>{' '}
          <Button
            color='warning'
            onClick={() => {
              clearFinish();
              toggleFade();
              toggle();
            }}
          >
            Clear only finish date
          </Button>{' '}
          <Button
            color='primary'
            onClick={() => {
              toggleFade();
              toggle();
            }}
          >
            Quit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteGoalInfo;
