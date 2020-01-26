import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Collapse, Button, CardBody, Card } from 'reactstrap'

const BodyFat = () => {
  const [isOpen, setIsOpen] = useState({
    resting: false,
    maxHeart: false,
    trainingHeart: false,
    bodyFat: false,
    bodyMeasurements: false
  })

  const { resting, maxHeart, trainingHeart, bodyFat, bodyMeasurements } = isOpen

  return (
    <>
      <p className="h2 text-center">Help page</p>
      <hr />

      <div className="my-4">
        <Button color="primary" className="w-100 mx-auto mb-2"
          onClick={() => setIsOpen({ ...isOpen, resting: !resting })}
        >
          Resting Metabolic Rate {' '}
          {resting ? <FontAwesomeIcon icon={faTimesCircle} size="1x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="1x" />}
        </Button>

        <Collapse isOpen={resting}>
          <Card>
            <CardBody>
              ...is the total number of calories burned when your body
              is completely at rest. RMR supports breathing,
              circulating blood, organ functions, and basic
              neurological functions. It is proportional to
              lean body mass and decreases approximately 0.01 kcal/min
              for each 1% increase in body fatness.
            </CardBody>
          </Card>
        </Collapse>
      </div>

      <div className="my-4">
        <Button color="primary" className="w-100 mx-auto mb-2"
          onClick={() => setIsOpen({ ...isOpen, maxHeart: !maxHeart })}
        >
          Resting Metabolic Rate {' '}
          {maxHeart ? <FontAwesomeIcon icon={faTimesCircle} size="1x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="1x" />}
        </Button>

        <Collapse isOpen={maxHeart}>
          <Card>
            <CardBody>
              ...the age-related number of beats per minute of the heart when working
               at its maximum that is usually estimated as 220 minus one's age reached
              90 percent of his maximum heart rate when tested on a treadmill
            </CardBody>
          </Card>
        </Collapse>
      </div>

      <div className="my-4">
        <Button color="primary" className="w-100 mx-auto mb-2"
          onClick={() => setIsOpen({ ...isOpen, trainingHeart: !trainingHeart })}
        >
          Training Heart Rate {' '}
          {trainingHeart ? <FontAwesomeIcon icon={faTimesCircle} size="1x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="1x" />}
        </Button>

        <Collapse isOpen={trainingHeart}>
          <Card>
            <CardBody>
              ...heart rate training zone is a range that defines the upper and lower
              limits of training intensities. It is calculated using an age-related predicted
              maximum heart rate (HRmax) and a special equation called heart rate reserve. <br /><br />
              The range is based on metabolic systems in your body that fuel your muscles
              during exercise, and how hard you want to train. Training from 40% to 85% of
              HRmax is aerobic exercise ("cardio"). Aerobic means "with oxygen." Training
              above 85% of HRmax is anaerobic exercise. Anaerobic means "without oxygen".
            </CardBody>
          </Card>
        </Collapse>
      </div>

      <div className="my-4">
        <Button color="primary" className="w-100 mx-auto mb-2"
          onClick={() => setIsOpen({ ...isOpen, bodyFat: !bodyFat })}
        >
          Body Fat Percentage {' '}
          {bodyFat ? <FontAwesomeIcon icon={faTimesCircle} size="1x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="1x" />}
        </Button>

        <Collapse isOpen={bodyFat}>
          <Card>
            <CardBody>
              ...your body fat percentage refers to the amount of fat present in your body as a
              percentage. It includes both essential fat and storage fat. Essential body fat is
              found in your nerves, bone marrow and organs and cannot be lost without negative side
              effects. The storage body fat accumulates when excess energy or calories are
              consumed - this is the type of fat you can safely reduce to either lose weight or lower
              your body fat percentage. <br /><br /> The U.S. Navy has devised a method to calculate your body fat
              percentage. It uses just a few measurements and a little math to come up with a value
              that can give you some insight in your health and weight.
            </CardBody>
          </Card>
        </Collapse>
      </div>

      <div className="my-4">
        <Button color="primary" className="w-100 mx-auto mb-2"
          onClick={() => setIsOpen({ ...isOpen, bodyMeasurements: !bodyMeasurements })}
        >
          Body measurements {' '}
          {bodyMeasurements ? <FontAwesomeIcon icon={faTimesCircle} size="1x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="1x" />}
        </Button>

        <Collapse isOpen={bodyMeasurements}>
          <Card>
            <CardBody>
              1. <b>Measure your height</b> while not wearing shoes. Stand straight,
                head erect and eyes looking forward.
            <br /><br />
              2. <b>Measure your waist</b>. Use the circumference of your waist at a horizontal
                level around the navel for men, and at the level with the least width for women.
                Your arms should be relaxed by your side. Don't pull or suck in your stomach. Try to
                relax and measure as you're exhaling to get the most accurate measurement.
            <br /><br />
              3. <b>Measure your neck</b>. Start below the larynx (Adam's apple) with the tape
                measure perpendicular to the long axis of the neck. Try to keep you head straight and
                look forward. Avoid flaring your neck out. Make sure your shoulders are down and relaxed,
                not hunched.
            <br /><br />
              4. <b>Measure your hips</b> if you are a woman. Place the tape measure around
                the largest width of your hips. If wearing clothes, pull the tape measure somewhat taught
                to account for the bulk of your clothing.
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </>
  )
}

export default BodyFat