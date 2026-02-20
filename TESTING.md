<h1>TESTING.md</h1>

<h2>Rubric Points and how we tested them</h2>

<ul>
  <li>
    Greeting function returns correct value
    <ul>
      <li>Tested getGreeting in common.test.js</li>
      <li>Confirmed it returns "Hello"</li>
    </ul>
  </li>
      <br>

  <li>
    Month names are converted correctly to month indexes
    <ul>
      <li>Tested monthNameToIndex in common.test.js</li>
      <li>Confirmed "September" returns 8</li>
      <li>Confirmed "January" returns 0</li>
    </ul>
  </li>
        <br>
  <li>
    Day names are converted correctly to weekday indexes
    <ul>
      <li>Tested dayNameToIndex in common.test.js</li>
      <li>Confirmed "Thursday" returns 4</li>
      <li>Confirmed "Sunday" returns 0</li>
    </ul>
  </li>
      <br>
  <li>
    monthNameToIndex throws error for invalid month
    <ul>
      <li>Tested in common.test.js</li>
      <li>Confirmed passing "Apriil" throws "Unknown monthName" error</li>
    </ul>
  </li>
      <br>
  <li>
    dayNameToIndex throws error for invalid day
    <ul>
      <li>Tested in common.test.js</li>
      <li>Confirmed passing "Thorsday" throws "Unknown dayName" error</li>
    </ul>
  </li>
      <br>
  <li>
    Find first weekday of a month works correctly
    <ul>
      <li>Tested findFirstWeekdayOfMonth in common.test.js</li>
      <li>Confirmed October 2024 first Tuesday is 1</li>
      <li>Confirmed September 2024 first Saturday is 7</li>
    </ul>
  </li>
      <br>
  <li>
    Find nth weekday of a month works correctly
    <ul>
      <li>Tested findNthWeekdayOfMonth in common.test.js</li>
      <li>Confirmed second Tuesday October 2024 is 8</li>
      <li>Confirmed second Tuesday October 2025 is 14</li>
    </ul>
  </li>
      <br>
  <li>
    Find last weekday of a month works correctly
    <ul>
      <li>Tested findLastWeekdayOfMonth in common.test.js</li>
      <li>Confirmed last Friday October 2024 is 25</li>
      <li>Confirmed last Friday October 2020 is 30</li>
    </ul>
  </li>
      <br>
  <li>
    calculateRecurringDay calculates recurring dates correctly
    <ul>
      <li>Tested calculateRecurringDay in common.test.js</li>
      <li>Confirmed Ada Lovelace Day 2024 is 2024-10-08</li>
      <li>Confirmed Ada Lovelace Day 2025 is 2025-10-14</li>
      <li>Confirmed World Lemur Day 2024 is 2024-10-25</li>
    </ul>
  </li>
</ul>