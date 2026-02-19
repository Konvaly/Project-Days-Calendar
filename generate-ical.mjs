// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import fs from "node:fs";
import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const startYear = 2020;
const endYear = 2030;

// Build ICS lines incrementally
const icsLines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar Project//EN",
];

// Generate one event per commemorative day
for (let year = startYear; year <= endYear; year++) {
  for (const dayDef of daysData) {
    const isoDate = calculateRecurringDay(year, dayDef);
    const compactDate = isoDate.replaceAll("-", "");

    icsLines.push(
      "BEGIN:VEVENT",
      `DTSTART;VALUE=DATE:${compactDate}`,
      `DTEND;VALUE=DATE:${compactDate}`,
      `SUMMARY:${dayDef.name}`,
      "END:VEVENT",
    );
  }
}

icsLines.push("END:VCALENDAR");

// Write file
fs.writeFileSync("days.ics", icsLines.join("\n"));

console.log("days.ics file with events created");
