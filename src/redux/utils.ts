import { SetCircumferencesInterface } from '../interfaces/interfaces';

export const addNewDailyWeight = (
  dailyWeightArray: { date: string; weight: number }[],
  itemToAdd: { date: string; weight: number }
) => {
  const existingItem = dailyWeightArray.find(
    (dailyWeight) => dailyWeight.date === itemToAdd.date
  );

  if (existingItem) {
    return dailyWeightArray.map((dailyWeight) =>
      dailyWeight.date === itemToAdd.date
        ? { ...dailyWeight, weight: itemToAdd.weight }
        : dailyWeight
    );
  }

  return [...dailyWeightArray, { ...itemToAdd }];
};

export const addNewMeasurement = (
  circumArray: SetCircumferencesInterface[],
  itemToAdd: SetCircumferencesInterface
) => {
  const existingItem = circumArray.find(
    (circumObj) => circumObj.date === itemToAdd.date
  );

  if (existingItem) {
    return circumArray.map((circumObj) =>
      circumObj.date === itemToAdd.date
        ? {
            ...circumObj,
            waist: itemToAdd.waist,
            hips: itemToAdd.hips,
            neck: itemToAdd.neck,
            chest: itemToAdd.chest,
            shoulders: itemToAdd.shoulders,
            thighs: itemToAdd.thighs,
            biceps: itemToAdd.biceps
          }
        : circumObj
    );
  }

  return [...circumArray, { ...itemToAdd }];
};
