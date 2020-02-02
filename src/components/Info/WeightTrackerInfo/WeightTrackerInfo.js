import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const WeightTrackerInfo = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button className="rounded mt-4" color="primary" size="sm" onClick={toggle}
      >
        Comment on weight change
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="mt-5">
        <ModalHeader toggle={toggle}>Weight loss process</ModalHeader>
        <ModalBody className="text-center">
          <p>
            Though weight loss may occur faster at the start of a diet,
            experts recommend a <b>weight loss of 0.45–1.36 kg per week</b>,
            or <b>about 1% of your body weight</b>. <br /><br />
            Drastic weight changes increase the <b>risk of yo-yo effect</b>. <br /> <br />
            Rapid weight loss can increase your risk of gallstones, dehydration, and malnutrition <br />
            Other <b>side effects</b> of rapid weight loss include: headaches, irritability,
            fatigue, constipation, hair loss, menstrual irregularities and muscle loss. <br /><br />
            The green line marks a healthy weight change trend, so it is reasonable to
            stay possibly close to it.
            </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default WeightTrackerInfo