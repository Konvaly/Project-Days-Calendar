import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function createMonthDaysUi() {
  let currentDate = new Date();

  // DOM
  const calendarGrid = document.getElementById("calendar-grid");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");
  const monthBtn = document.getElementById("current-month");
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");

  function buildEventsByDay(year, monthIndex) {
    // Convert monthIndex (0-11) to the same month name format used in days.json, e.g. "October"
    const currentMonthName = new Date(year, monthIndex, 1).toLocaleDateString(
      "en-US",
      { month: "long" },
    );

    // eventsByDay will look like: { 8: ["Ada Lovelace Day"], 25: ["World Lemur Day"] }
    const eventsByDay = {};

    for (const dayDef of daysData) {
      // Only handle events that belong to the month we are currently rendering
      if (dayDef.monthName !== currentMonthName) continue;

      // Use shared calculation engine to get the actual calendar date.
      // It returns an ISO string ("YYYY-MM-DD"), so we can safely extract the day.

      const isoDate = calculateRecurringDay(year, dayDef);

      // Extract the "DD" part and convert to a number (e.g. "08" -> 8)
      const dayOfMonth = Number(isoDate.slice(8, 10));

      if (!eventsByDay[dayOfMonth]) {
        eventsByDay[dayOfMonth] = [];
      }
      eventsByDay[dayOfMonth].push(dayDef.name);
    }

    return eventsByDay;
  }

  function populateDropdowns(date) {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Populate months only once
    if (monthSelect.options.length === 0) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      monthNames.forEach((name, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = name;
        monthSelect.appendChild(option);
      });
    }

    // Populate years only once
    if (yearSelect.options.length === 0) {
      for (let year = 1900; year <= 2100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      }
    }

    // Sync dropdown selection with calendar
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
  }

  // Initial render immediately
  renderCalendar(currentDate);

  function renderCalendar(date) {
    clearCalendar();
    updateMonthLabel(date);
    populateDropdowns(date);
    generateDays(date);
  }

  function clearCalendar() {
    const dayCells = calendarGrid.querySelectorAll(".day-cell");
    dayCells.forEach((cell) => cell.remove());
  }

  function updateMonthLabel(date) {
    const options = { month: "long", year: "numeric" };
    monthBtn.textContent = date.toLocaleDateString("en-US", options);
  }

  function generateDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const eventsByDay = buildEventsByDay(year, month);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    // Total calendar cells must always be 42 (6 weeks × 7 days)
    const totalCells = 42;

    let dayCounter = 1;

    for (let i = 0; i < totalCells; i++) {
      if (i < startingDay || dayCounter > totalDays) {
        createDayCell("", true);
      } else {
        const isToday =
          dayCounter === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();

        const eventNames = eventsByDay[dayCounter] ?? [];
        createDayCell(dayCounter, false, isToday, eventNames);

        dayCounter++;
      }
    }
  }

  function createDayCell(
    content,
    isEmpty = false,
    isToday = false,
    eventNames = [],
  ) {
    const cell = document.createElement("div");
    cell.classList.add("day-cell");

    if (isEmpty) {
      cell.classList.add("empty");
    } else {
      // Create container for day number
      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = content;
      cell.appendChild(dayNumber);

      if (eventNames.length > 0) {
        cell.classList.add("has-event");
        cell.title = eventNames.join(", ");

        // Create visible event label container
        const eventsContainer = document.createElement("div");
        eventsContainer.classList.add("day-events");

        for (const name of eventNames) {
          const eventLabel = document.createElement("div");
          eventLabel.textContent = name;
          eventsContainer.appendChild(eventLabel);
        }

        cell.appendChild(eventsContainer);
      }
    }

    if (isToday) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }

  // Navigation
  prevBtn.addEventListener("click", () => {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    renderCalendar(currentDate);
  });
}
createMonthDaysUi();
