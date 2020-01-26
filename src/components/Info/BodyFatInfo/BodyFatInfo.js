import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const BodyFatInfo = (props) => {
  const { buttonLabel, className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button className="rounded mb-0 ml-2" color="primary" size="sm" onClick={toggle}
      >
        {buttonLabel}
        <FontAwesomeIcon icon={faInfo} size="sm" />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Body fat info</ModalHeader>
        <ModalBody className="text-center">
          You can check your body fat percentage by using <b>skinfold caliper</b>,
          but the most commonly used estimation formula in body fat percentage calculations
          is the <b>U.S. Navy fitness formula.</b>
          <br /><br />
          Calculation require giving body measurements in specific areas.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>{' '}
          <Button color="danger" onClick={() => props.history.push('/bodyFat')}>
            Add them here
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default withRouter(BodyFatInfo)