import { getGreeting, monthNameToIndex, dayNameToIndex } from "./common.mjs";
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
