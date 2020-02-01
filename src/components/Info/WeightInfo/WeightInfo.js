import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const WeightInfo = (props) => {
  // const { buttonLabel, className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button className="rounded ml-3" color="primary" size="sm" onClick={toggle}
      >
        <FontAwesomeIcon icon={faInfo} size="sm" />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="mt-5">
        <ModalHeader toggle={toggle}>Weight loss process</ModalHeader>
        <ModalBody className="text-center">
          Losing weight is usually <b>not a linear process</b>.
          <br /><br />
          Some days and weeks you may lose weight,
          while during others you may gain a little bit.
          <br /><br />
          <b>This is not a cause for concern</b>. It’s normal for body weight
          to fluctuate up and down by a few kg. For example, you may
          be carrying more food in your digestive
          system or holding on to more water than usual.
          <br /><br />
          This is even more pronounced in women, as water weight can
          fluctuate significantly during the menstrual cycle.
          <br /><br />
          As long as the <b>general trend</b> is going downwards, no matter how much it
          fluctuates, you will still succeed in losing weight <b>over the long term</b>.
          <br /><br />
          The same applies to the process of building muscle mass.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default WeightInfo