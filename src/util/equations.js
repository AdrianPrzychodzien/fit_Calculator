export const calcBMI = data => {
  const height = data.height / 100
  const result = (data.weight / (height * height)).toFixed(2)

  return result
}

export const rangeBMI = data => {
  let result
  if (data < 16) {
    result = 'Severe Thinness'
  } else if (16 < data && data <= 17) {
    result = 'Moderate Thinness'
  } else if (17 < data && data <= 18.5) {
    result = 'Mild Thinness'
  } else if (18.5 < data && data <= 25) {
    result = 'Normal Weight'
  } else if (25 < data && data <= 30) {
    result = 'Overweight'
  } else {
    result = 'Obese'
  }

  return result
}

export const idealBMI = data => {
  const height = data.height / 100
  const resultMax = (25 * height * height).toFixed(1)
  const resultMin = (18.5 * height * height).toFixed(1)

  return [resultMin, resultMax]
}

export const userBmiTip = data => {
  const [normalBMIMin, normalBMIMax] = idealBMI(data)
  let userBmiTip, top, bottom

  if (rangeBMI(calcBMI(data)) === 'Normal Weight') {
    top = normalBMIMax - data.weight
    bottom = data.weight - normalBMIMin

    userBmiTip = `You are ${bottom} kg above the lower limit and ${top} below upper limit`
  } else if (rangeBMI(calcBMI(data)) === 'Overweight' || rangeBMI(calcBMI(data)) === 'Obese') {
    bottom = data.weight - normalBMIMax

    userBmiTip = `You are ${bottom} kg above the upper limit`
  } else {
    top = normalBMIMin - data.weight

    userBmiTip = `You are ${top} kg under the lower limit`
  }

  return userBmiTip
}

export const maxHeartRate = data => {
  let result
  if (data.sex === 'Male') {
    result = 208 - (0.80 * data.age)
  } else if (data.sex === 'Female') {
    result = 201 - (0.63 * data.age)
  }

  return result
}

export const trainingHeartRate = max => {
  let resultMin = Math.round(max * 0.65)
  let resultMax = Math.round(max * 0.85)

  return [resultMin, resultMax]
}

export const MifflinStJeor = data => {
  let output = Math.round(restingMifflinStJeor(data) * activityLevel(data.lifeActivity))
  return output
}

export const HarrisBenedict = data => {
  let output = Math.round(restingHarrisBenedict(data) * activityLevel(data.lifeActivity))
  return output
}

export const KatchMcardle = data => {
  let output = Math.round(restingKatchMcardle(data) * activityLevel(data.lifeActivity))
  return output
}

export const restingMifflinStJeor = data => {
  const { sex, weight, height, age } = data
  let result

  if (sex === 'Male') {
    result = (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else if (sex === 'Female') {
    result = (10 * weight) + (6.25 * height) - (5 * age) - 161
  } else {
    alert('Choose your sex')
  }
  return Math.round(result)
}

export const restingHarrisBenedict = data => {
  let result
  if (data.sex === 'Male') {
    result = (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age) + 88.362
  } else if (data.sex === 'Female') {
    result = (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age) + 447.593
  } else {
    alert('Choose your sex')
  }

  return Math.round(result)
}

export const restingKatchMcardle = data => {
  const leanBodyMass = (data.weight * (100 - data.fat)) / 100

  const BMR = Math.round(370 + (21.6 * leanBodyMass))

  return BMR
}

export const activityLevel = data => {
  let result
  switch (data) {
    case 1:
      result = 1.2
      break
    case 2:
      result = 1.375
      break
    case 3:
      result = 1.55
      break
    case 4:
      result = 1.725
      break
    case 5:
      result = 1.9
      break
    default:
      alert('Choose your activity level')
  }

  return result
}

export const activityLevelComment = data => {
  let result
  switch (data) {
    case 1:
      result = 'being Sedentary'
      break
    case 2:
      result = 'doing Light Exercise'
      break
    case 3:
      result = 'doing Moderate Exercise'
      break
    case 4:
      result = 'doing Heavy Exercise'
      break
    case 5:
      result = 'working out like an Athlete'
      break
    default:
      alert('Choose your activity level')
  }

  return result
}

export const idealBodyFatPercentage = data => {
  const { sex, age } = data
  let result

  if (sex === 'Male') {
    if (age < 20) {
      result = 8.5
    } else if (20 < age && age <= 25) {
      result = 10.5
    } else if (25 < age && age <= 30) {
      result = 12.7
    } else if (30 < age && age <= 35) {
      result = 13.7
    } else if (35 < age && age <= 40) {
      result = 15.3
    } else if (40 < age && age <= 45) {
      result = 16.4
    } else if (45 < age && age <= 50) {
      result = 18.9
    } else if (50 < age && age <= 55) {
      result = 20.9
    } else {
      result = '21+'
    }
  }

  if (sex === 'Female') {
    if (age < 20) {
      result = 17.7
    } else if (20 < age && age <= 25) {
      result = 18.4
    } else if (25 < age && age <= 30) {
      result = 19.3
    } else if (30 < age && age <= 35) {
      result = 21.5
    } else if (35 < age && age <= 40) {
      result = 22.2
    } else if (40 < age && age <= 45) {
      result = 22.9
    } else if (45 < age && age <= 50) {
      result = 25.5
    } else if (50 < age && age <= 55) {
      result = 26.3
    } else {
      result = '27+'
    }
  }

  return result
}

export const bodyFatFormula = (fatData, userData) => {
  const { waist, neck, hip } = fatData
  const { sex, height } = userData
  let result

  if (sex === 'Male') {
    // result = 495 / (1.29579 - 0.35004 * Math.log10(waist - neck) + 0.22100 * Math.log10(height)) - 450
    result = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
  } else if (sex === "Female") {
    // result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450
    result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450
  }

  return Math.round(result)
}