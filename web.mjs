import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function createMonthDaysUi() {

  let currentDate   = new Date();
  const today       = new Date();

  // DOM
  const calendarGrid  = document.getElementById("calendar-grid");
  const prevBtn       = document.getElementById("prev-month");
  const nextBtn       = document.getElementById("next-month");
  const monthBtn      = document.getElementById("current-month");

  // Initial render immediately
  renderCalendar(currentDate);

  function renderCalendar(date) {
    clearCalendar();
    updateMonthLabel(date);
    generateDays(date);
  }

  function clearCalendar() {
    const dayCells = calendarGrid.querySelectorAll(".day-cell");
    dayCells.forEach(cell => cell.remove());
  }

  function updateMonthLabel(date) {
    const options = { month: "long", year: "numeric" };
    monthBtn.textContent = date.toLocaleDateString("en-US", options);
  }

  function generateDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const totalDays   = lastDayOfMonth.getDate();
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

        createDayCell(dayCounter, false, isToday);
        dayCounter++;
      }
    }
  }

  function createDayCell(content, isEmpty = false, isToday = false) {
    const cell = document.createElement("div");
    cell.classList.add("day-cell");

    if (isEmpty) {
      cell.classList.add("empty");
    } else {
      cell.textContent = content;
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
      1
    );
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    renderCalendar(currentDate);
  });
}
createMonthDaysUi()


