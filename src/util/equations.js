export const calcBMI = data => {
  const height = data.height / 100
  const result = (data.weight / (height * height)).toFixed(2)

  return result
}

export const MifflinStJeor = data => {
  let result
  if (data.sex === 'Male') {
    result = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5
  } else if (data.sex === 'Female') {
    result = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161
  } else {
    alert('Choose your sex')
  }

  let output = Math.round(result * activityLevel(data.lifeActivity))
  return output
}

export const HarrisBenedict = data => {
  let result
  if (data.sex === 'Male') {
    result = (13.397 * data.weight) + (4.799 * data.height) - (5.677 * data.age) + 88.362
  } else if (data.sex === 'Female') {
    result = (9.247 * data.weight) + (3.098 * data.height) - (4.330 * data.age) + 447.593
  } else {
    alert('Choose your sex')
  }

  let output = Math.round(result * activityLevel(data.lifeActivity))
  return output
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