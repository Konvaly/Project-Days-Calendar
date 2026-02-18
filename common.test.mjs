import {
  getGreeting,
  monthNameToIndex,
  dayNameToIndex,
  findFirstWeekdayOfMonth,
  findNthWeekdayOfMonth,
  findLastWeekdayOfMonth,
  calculateRecurringDay,
} from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import assert from "node:assert";
import test from "node:test";

test("Greeting is correct", () => {
  assert.equal(getGreeting(), "Hello");
});

test("monthNameToIndex converts month names correctly", () => {
  assert.equal(monthNameToIndex("September"), 8);
  assert.equal(monthNameToIndex("January"), 0);
});

test("dayNameToIndex converts day names correctly", () => {
  assert.equal(dayNameToIndex("Thursday"), 4);
  assert.equal(dayNameToIndex("Sunday"), 0);
});

test("monthNameToIndex throws for unknown month", () => {
  assert.throws(() => monthNameToIndex("Apriil"), /Unknown monthName/);
});

test("dayNameToIndex throws for unknown day", () => {
  assert.throws(() => dayNameToIndex("Thorsday"), /Unknown dayName/);
});

test("find first weekday in month", () => {
  // October 2024 first Tuesday is Oct 1
  assert.equal(findFirstWeekdayOfMonth(2024, 9, 2), 1);

  // September 2024 first Saturday is Sep 7
  assert.equal(findFirstWeekdayOfMonth(2024, 8, 6), 7);
});

test("find nth weekday of month", () => {
  assert.equal(findNthWeekdayOfMonth(2024, 9, 2, 2), 8);
  assert.equal(findNthWeekdayOfMonth(2025, 9, 2, 2), 14);
});

test("find last weekday of month", () => {
  // October 2024 last Friday = Oct 25
  assert.equal(findLastWeekdayOfMonth(2024, 9, 5), 25);

  // October 2020 last Friday = Oct 30
  assert.equal(findLastWeekdayOfMonth(2020, 9, 5), 30);
});

test("calculate Ada Lovelace Day correctly", () => {
  assert.equal(calculateRecurringDay(2024, daysData[0]), "2024-10-08");
  assert.equal(calculateRecurringDay(2025, daysData[0]), "2025-10-14");
});

test("calculate World Lemur Day correctly", () => {
  assert.equal(calculateRecurringDay(2024, daysData[4]), "2024-10-25");
});
