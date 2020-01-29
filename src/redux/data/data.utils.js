export const addNewDailyWeight = (dailyWeightArray, itemToAdd) => {
  const existingItem = dailyWeightArray.find(
    dailyWeight => dailyWeight.date === itemToAdd.date
  )

  if (existingItem) {
    return dailyWeightArray.map(dailyWeight =>
      dailyWeight.date === itemToAdd.date
        ? { ...dailyWeight, weight: itemToAdd.weight }
        : dailyWeight
    )
  }

  return [...dailyWeightArray, { ...itemToAdd }]
}