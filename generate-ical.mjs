// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import fs from "node:fs";
import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

// Create minimal ICS calendar skeleton
const icsContent = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Days Calendar Project//EN",
  "END:VCALENDAR",
].join("\n");

// Write to file
fs.writeFileSync("days.ics", icsContent);

console.log("days.ics file created");
