import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import './Help.scss'

const BodyFat = () => {
  const [show, setShow] = useState({
    resting: false,
    maxHeart: false,
    trainingHeart: false,
    bodyFat: false,
    bodyMeasurements: false
  })

  const { resting, maxHeart, trainingHeart, bodyFat, bodyMeasurements } = show

  return (
    <div className="help">
      <h2 className="help__title">Help page</h2>
      <hr />

      <div className="help__container"
        onClick={() => { setShow({ ...show, resting: !resting }) }}
      >
        <h4>
          Resting Metabolic Rate
        </h4>
        <div className="help__icon">
          {resting ? <FontAwesomeIcon icon={faTimesCircle} size="2x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="2x" />}
        </div>
      </div>
      <div className={resting ? "help__text show" : "help__text"}>
        ...is the total number of calories burned when your body
        is completely at rest. RMR supports breathing,
        circulating blood, organ functions, and basic
        neurological functions. It is proportional to
        lean body mass and decreases approximately 0.01 kcal/min
        for each 1% increase in body fatness.
      </div>

      <div className="help__container"
        onClick={() => { setShow({ ...show, maxHeart: !maxHeart }) }}
      >
        <h4 >
          Maximum Heart Rate
        </h4>
        <div className="help__icon">
          {maxHeart ? <FontAwesomeIcon icon={faTimesCircle} size="2x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="2x" />}
        </div>
      </div>
      <div className={maxHeart ? "help__text show" : "help__text"}>
        ...the age-related number of beats per minute of the heart when working
        at its maximum that is usually estimated as 220 minus one's age reached
        90 percent of his maximum heart rate when tested on a treadmill
      </div>

      <div className="help__container"
        onClick={() => { setShow({ ...show, trainingHeart: !trainingHeart }) }}
      >
        <h4 >
          Training Heart Rate
        </h4>
        <div className="help__icon">
          {trainingHeart ? <FontAwesomeIcon icon={faTimesCircle} size="2x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="2x" />}
        </div>
      </div>
      <div className={trainingHeart ? "help__text show" : "help__text"}>
        ...heart rate training zone is a range that defines the upper and lower
        limits of training intensities. It is calculated using an age-related predicted
        maximum heart rate (HRmax) and a special equation called heart rate reserve.
        The range is based on metabolic systems in your body that fuel your muscles
        during exercise, and how hard you want to train. Training from 40% to 85% of
        HRmax is aerobic exercise ("cardio"). Aerobic means "with oxygen." Training
        above 85% of HRmax is anaerobic exercise. Anaerobic means "without oxygen".
      </div>

      <div className="help__container"
        onClick={() => { setShow({ ...show, bodyFat: !bodyFat }) }}
      >
        <h4 >
          Body Fat Percentage
        </h4>
        <div className="help__icon">
          {bodyFat ? <FontAwesomeIcon icon={faTimesCircle} size="2x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="2x" />}
        </div>
      </div>
      <div className={bodyFat ? "help__text show" : "help__text"}>
        ...your body fat percentage refers to the amount of fat present in your body as a
        percentage. It includes both essential fat and storage fat. Essential body fat is
        found in your nerves, bone marrow and organs and cannot be lost without negative side
        effects. The storage body fat accumulates when excess energy or calories are
        consumed - this is the type of fat you can safely reduce to either lose weight or lower
        your body fat percentage. The U.S. Navy has devised a method to calculate your body fat
        percentage. It uses just a few measurements and a little math to come up with a value
        that can give you some insight in your health and weight.
      </div>

      <div className="help__container"
        onClick={() => { setShow({ ...show, bodyMeasurements: !bodyMeasurements }) }}
      >
        <h4 >
          Body measurements
        </h4>
        <div className="help__icon">
          {bodyMeasurements ? <FontAwesomeIcon icon={faTimesCircle} size="2x" /> :
            <FontAwesomeIcon icon={faBookOpen} size="2x" />}
        </div>
      </div>
      <div className={bodyMeasurements ? "help__text show" : "help__text"}>
        1. <span>Measure your height</span> while not wearing shoes. Stand straight,
        head erect and eyes looking forward.
        <br /><br />
        2. <span>Measure your waist</span>. Use the circumference of your waist at a horizontal
        level around the navel for men, and at the level with the least width for women.
         Your arms should be relaxed by your side. Don't pull or suck in your stomach. Try to
         relax and measure as you're exhaling to get the most accurate measurement.
         <br /><br />
        3. <span>Measure your neck</span>. Start below the larynx (Adam's apple) with the tape
       measure perpendicular to the long axis of the neck. Try to keep you head straight and
       look forward. Avoid flaring your neck out. Make sure your shoulders are down and relaxed,
       not hunched.
       <br /><br />
        4. <span>Measure your hips</span> if you are a woman. Place the tape measure around
     the largest width of your hips. If wearing clothes, pull the tape measure somewhat taught
     to account for the bulk of your clothing.
      </div>


    </div>
  )
}



export default BodyFat