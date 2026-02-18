// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
  return "Hello";
}

export const MONTH_NAME_TO_INDEX = Object.freeze({
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
});

export const DAY_NAME_TO_INDEX = Object.freeze({
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
});

export function monthNameToIndex(monthName) {
  const index = MONTH_NAME_TO_INDEX[monthName];
  if (index === undefined) {
    throw new Error(`Unknown monthName: "${monthName}"`);
  }
  return index;
}

export function dayNameToIndex(dayName) {
  const index = DAY_NAME_TO_INDEX[dayName];
  if (index === undefined) {
    throw new Error(`Unknown dayName: "${dayName}"`);
  }
  return index;
}
