import {
  getGreeting,
  monthNameToIndex,
  dayNameToIndex,
  findFirstWeekdayOfMonth,
  findNthWeekdayOfMonth,
} from "./common.mjs";
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
