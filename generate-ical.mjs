// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

// Temporary verification: calculate commemorative days for one example year
const exampleYear = 2024;

for (const dayDef of daysData) {
  const isoDate = calculateRecurringDay(exampleYear, dayDef);
  console.log(`${dayDef.name}: ${isoDate}`);
}
