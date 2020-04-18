import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faStar } from '@fortawesome/free-solid-svg-icons';

interface Props extends RouteComponentProps {
  buttonLabel?: string;
  className?: string;
}

const ActivityInfo: React.FC<Props> = ({ buttonLabel, className }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const startIcon = (
    <FontAwesomeIcon icon={faStar} size='1x' style={{ color: '#c5a100c4' }} />
  );

  return (
    <div>
      <Button
        className='rounded mb-0 ml-2'
        color='primary'
        size='sm'
        onClick={toggle}
      >
        {buttonLabel}
        <FontAwesomeIcon icon={faInfo} size='sm' />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Activity levels</ModalHeader>
        <ModalBody className='text-center'>
          <div>
            <p>
              {startIcon}
              <br />I am <b>sedentary</b> <br />
              (little or no exercise)
            </p>
          </div>
          <div>
            <p>
              {startIcon}
              {startIcon}
              <br />I am <b>lightly active</b> <br />
              (light exercise or sports 1-3 days per week)
            </p>
          </div>
          <div>
            <p>
              {startIcon}
              {startIcon}
              {startIcon}
              <br />I am <b>moderately active</b> <br />
              (moderate exercise/sports 3-5 days per week)
            </p>
          </div>
          <div>
            <p>
              {startIcon}
              {startIcon}
              {startIcon}
              {startIcon}
              <br />I am <b>very active</b>
              <br /> (hard exercise/sports 6-7 days per week)
            </p>
          </div>
          <div>
            <p>
              {startIcon}
              {startIcon}
              {startIcon}
              {startIcon}
              {startIcon}
              <br />I am <b>super active</b>
              <br /> (very hard exercise/sports and a physical job)
            </p>
          </div>
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

export default withRouter(ActivityInfo);
