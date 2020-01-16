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
    result = 'Normal'
  } else if (25 < data && data <= 30) {
    result = 'OverWeight'
  } else {
    result = 'Obese'
  }

  return result
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
  let result
  if (data.sex === 'Male') {
    result = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5
  } else if (data.sex === 'Female') {
    result = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161
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

const activityLevel = data => {
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

export const bodyFatFormula = data => {
  let result
  if (data.sex === 'Male') {
    // result = 495 / (1.29579 - 0.35004 * Math.log10(data.waist - data.neck) + 0.22100 * Math.log10(data.height)) - 450
    result = 495 / (1.0324 - 0.19077 * Math.log10(data.waist - data.neck) + 0.15456 * Math.log10(data.height)) - 450
  } else if (data.sex === "Female") {
    // result = 495 / (1.29579 - 0.35004 * Math.log10(data.waist + data.hip - data.neck) + 0.22100 * Math.log10(data.height)) - 450
    result = 495 / (1.29579 - 0.35004 * Math.log10(data.waist + data.hip - data.neck) + 0.22100 * Math.log10(data.height)) - 450
  }

  return Math.round(result)
}