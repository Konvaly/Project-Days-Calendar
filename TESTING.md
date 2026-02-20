# TESTING.md

This document describes how the Days Calendar project was tested against the project rubric.

---

## Calendar Display

- On page load, the calendar shows the current month.
- Today's date is highlighted.
- Verified manually by opening the deployed site.

**Result:** Passed

---

## Month Navigation

- Previous and Next buttons navigate correctly across months and years.
- No navigation limits encountered.

**Result:** Passed

---

## Month/Year Selector

- Dropdown selectors allow jumping to any month (1900–2100).
- Calendar updates immediately.
- Dropdown values stay synced with navigation buttons.

**Result:** Passed

---

## Calendar Layout Accuracy

Checked specific rubric months:

- **2024-12:** correct start/end days, 5 rows.
- **2025-02:** correct empty cells before/after.
- **2025-05:** correct row layout.
- **2026-02:** exactly 4 weeks, no extra rows.

Verified visually and via browser console:

```js
document.querySelectorAll(".day-cell").length;
```

**Result:** Passed

## Commemorative Days

**Verified sample dates:**

- Oct 8 2024 → Ada Lovelace Day
- Oct 25 2024 → World Lemur Day
- Oct 13 2020 → Ada Lovelace Day
- May 11 2030 → International Binturong Day

Events display correctly and update the description panel when clicked.

**Result:** Passed

---

## Unit Tests

Unit tests are located in `common.test.mjs`.

**Tested:**

- Month/day name conversions
- First, nth, and last weekday calculations
- Recurring commemorative day calculations

**Run tests with:**

```bash
npm install
npm test

```

All tests pass.

**Result:** Passed  
(Unit tests located in `common.test.mjs`)

---

## Accessibility

- Calendar heading properly labelled
- Day cells keyboard accessible (Tab, Enter, Space)
- Lighthouse Snapshot Accessibility score: 100%

**Result:** Passed

---

## ICS File Generation (Group of 2 Requirement)

Generated with:

```bash
node generate-ical.mjs

```

**Verified:**

- File `days.ics` created
- Events generated for years 2020–2030 inclusive
- Events are whole-day (no times)
- Successfully imported into Google Calendar

**Result:** Passed

---

## Code Cleanup

- Removed scaffolding and unused code
- No console errors

**Result:** Passed

---

## Final Status

All rubric requirements tested and passed.
