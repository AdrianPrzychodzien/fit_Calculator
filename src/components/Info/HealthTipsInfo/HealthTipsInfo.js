import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const HealthTipsInfo = ({ healthTips, dailyWeightArray, clearFinish }) => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const { info, kgAmout, days } = healthTips
  const firstItem = dailyWeightArray.length ? dailyWeightArray[0].weight : null

  // max weight change = 1,5% per week
  const rapidWeightChange = (kgAmout / days * 7).toFixed(2) > ((firstItem / 100) + 0.5).toFixed(2) && true

  return (
    <div>
      <Button
        size="sm"
        className="rounded my-2"
        color={rapidWeightChange ? "warning" : "primary"}
        onClick={toggle}
      >
        {rapidWeightChange ? `Fast pace of weight change!` : 'Healthy pace of weight change'}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="mt-5">
        <ModalHeader toggle={toggle}>Health tips</ModalHeader>
        <ModalBody className="text-center">
          <p>
            According to the entered data you <b>{info}</b> in <b>{days} days</b>,
          which forces you to change your body weight
          by <b>{(kgAmout / days).toFixed(2)}kg per day</b>{' '}
            (<b>{(kgAmout / days * 7).toFixed(2)}kg per week</b>)
          </p>
          <div>
            Healthy pace of lost/gain weight is about 1% of your body weight. <br /><br />
            {rapidWeightChange ? (
              <p style={{ color: 'red', fontWeight: 'bold' }}>You will need to change weight too quickly!
              Consider slowing down to prevent side effects, like yo-yo effect. <br />
                Mayby you should extend timeline?</p>
            ) : (
                <p style={{ color: 'green', fontWeight: 'bold' }}>You are changing your weight in healthy pace! Well done!</p>
              )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Ok</Button>
          {rapidWeightChange
            && <Button color="warning"
              onClick={() => clearFinish()}
            >
              Change finish date
            </Button>
          }
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default HealthTipsInfo