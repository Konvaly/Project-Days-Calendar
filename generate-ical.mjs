import fs from "node:fs";
import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const startYear = 2020;
const endYear = 2030;

const icsLines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar Project//EN",
];

for (let year = startYear; year <= endYear; year++) {
  for (const dayDef of daysData) {
    const isoDate = calculateRecurringDay(year, dayDef);
    const compactDate = isoDate.replaceAll("-", "");

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:${dayDef.name}-${year}@days-calendar`,
      `DTSTART;VALUE=DATE:${compactDate}`,
      `DTEND;VALUE=DATE:${compactDate}`,
      `SUMMARY:${dayDef.name}`,
      "END:VEVENT",
    );
  }
}

icsLines.push("END:VCALENDAR");

fs.writeFileSync("days.ics", icsLines.join("\n"));

console.log("days.ics file with events created");
