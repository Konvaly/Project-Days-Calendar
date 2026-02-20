import { calculateRecurringDay } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function createMonthDaysUi() {
  let currentDate = new Date();

  const calendarGrid = document.getElementById("calendar-grid");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");
  const monthHeading = document.getElementById("calendar-heading");
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const descriptionPanel = document.getElementById("event-description");

  function buildEventsByDay(year, monthIndex) {
    const currentMonthName = new Date(year, monthIndex, 1).toLocaleDateString(
      "en-US",
      { month: "long" },
    );

    const eventsByDay = {};

    for (const dayDef of daysData) {
      if (dayDef.monthName !== currentMonthName) continue;

      const isoDate = calculateRecurringDay(year, dayDef);

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

    if (yearSelect.options.length === 0) {
      for (let year = 1900; year <= 2100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      }
    }

    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
  }

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
    monthHeading.textContent = date.toLocaleDateString("en-US", options);
  }

  function generateDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const eventsByDay = buildEventsByDay(year, month);

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const leadingEmptyCells = startingDay;
    const daysWithLeading = leadingEmptyCells + totalDays;

    const trailingEmptyCells = (7 - (daysWithLeading % 7)) % 7;

    const totalCells = leadingEmptyCells + totalDays + trailingEmptyCells;

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
      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = content;
      cell.appendChild(dayNumber);

      cell.setAttribute("tabindex", "0");
      cell.setAttribute("role", "button");
      if (eventNames.length > 0) {
        cell.classList.add("has-event");
        cell.title = eventNames.join(", ");
        cell.style.cursor = "pointer";

        const handleSelection = () => {
          descriptionPanel.innerHTML = `<p>${eventNames.join(", ")} selected.</p>`;
        };

        cell.addEventListener("click", handleSelection);

        cell.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelection();
          }
        });

        const eventsContainer = document.createElement("div");
        eventsContainer.classList.add("day-events");

        for (const name of eventNames) {
          const eventLabel = document.createElement("div");
          eventLabel.textContent = name;
          eventsContainer.appendChild(eventLabel);
        }

        cell.appendChild(eventsContainer);
      } else if (!isEmpty) {
        cell.addEventListener("click", () => {
          descriptionPanel.innerHTML =
            "<p>Select a commemorative day to see details.</p>";
        });
      }
    }

    if (isToday) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }

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

  monthSelect.addEventListener("change", () => {
    currentDate = new Date(
      Number(yearSelect.value),
      Number(monthSelect.value),
      1,
    );
    renderCalendar(currentDate);
  });

  yearSelect.addEventListener("change", () => {
    currentDate = new Date(
      Number(yearSelect.value),
      Number(monthSelect.value),
      1,
    );
    renderCalendar(currentDate);
  });
}
createMonthDaysUi();
