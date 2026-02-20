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

export function findFirstWeekdayOfMonth(year, monthIndex, weekdayIndex) {
  const date = new Date(year, monthIndex, 1);

  while (date.getDay() !== weekdayIndex) {
    date.setDate(date.getDate() + 1);
  }

  return date.getDate();
}

export function findNthWeekdayOfMonth(
  year,
  monthIndex,
  weekdayIndex,
  occurrenceIndex,
) {
  const firstDay = findFirstWeekdayOfMonth(year, monthIndex, weekdayIndex);

  const dayOfMonth = firstDay + (occurrenceIndex - 1) * 7;

  const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();

  if (dayOfMonth > lastDayOfMonth) {
    throw new Error("Invalid occurrence for this month");
  }

  return dayOfMonth;
}

export function findLastWeekdayOfMonth(year, monthIndex, weekdayIndex) {
  const date = new Date(year, monthIndex + 1, 0);

  while (date.getDay() !== weekdayIndex) {
    date.setDate(date.getDate() - 1);
  }

  return date.getDate();
}

export function calculateRecurringDay(year, dayDefinition) {
  const { monthName, dayName, occurrence } = dayDefinition;

  const monthIndex = monthNameToIndex(monthName);
  const weekdayIndex = dayNameToIndex(dayName);

  let dayOfMonth;

  if (occurrence === "last") {
    dayOfMonth = findLastWeekdayOfMonth(year, monthIndex, weekdayIndex);
  } else {
    const occurrenceMap = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
    };

    const occurrenceIndex = occurrenceMap[occurrence];

    if (!occurrenceIndex) {
      throw new Error(`Unknown occurrence: "${occurrence}"`);
    }

    dayOfMonth = findNthWeekdayOfMonth(
      year,
      monthIndex,
      weekdayIndex,
      occurrenceIndex,
    );
  }

  const month = String(monthIndex + 1).padStart(2, "0");
  const day = String(dayOfMonth).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
