import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Fade } from 'reactstrap'

const DeleteGoal = ({ clearGoal, clearGoalSaveWeights, className }) => {
  const [fadeIn, setFadeIn] = useState(false)
  const [modal, setModal] = useState(false)

  const toggleFade = () => setFadeIn(!fadeIn)
  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button className="" size="sm" onClick={toggleFade}>
        Delete?
      </Button>
      <Fade in={fadeIn} tag="h5" className="mt-3">
        Delete actual goal and set new
        <Button className="ml-2" color="danger" onClick={toggle}>
          Delete
        </Button>
      </Fade>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
        <ModalBody className="text-center">
          <div>
            You will lose saved information about your weight,
            as well as start and finish date from your actual goal.
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={() => { clearGoalSaveWeights(); toggleFade(); toggle() }}>Delete but leave weights</Button>{' '}
          <Button color="danger" onClick={() => { clearGoal(); toggleFade(); toggle() }}>Delete</Button>{' '}
          <Button color="primary" onClick={toggle}>Quit</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteGoal