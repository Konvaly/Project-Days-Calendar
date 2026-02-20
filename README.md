# Days Calendar Project

## Overview

This project is a web calendar that dynamically displays commemorative days which occur annually based on patterns (e.g. “second Tuesday of October”).

It was built as part of a team training project to practice JavaScript modules, date calculations, accessibility, testing, and deployment workflows.

**Live deployed site:**  
https://cyf-team-days-calendar.netlify.app/

---

## Features

- Dynamic monthly calendar view
- Previous / next month navigation
- Month and year dropdown selectors
- Automatic calculation of recurring commemorative days from `days.json`
- Highlighted current day
- Accessible keyboard navigation
- iCal (.ics) file generator for calendar import
- Shared date calculation logic between web UI and Node script
- Unit tests for core date logic

---

## Tech Stack

- Vanilla JavaScript (ES Modules)
- HTML5 + CSS3
- Node.js (for ICS generator and tests)
- Netlify deployment
- GitHub for version control

---

---

## Running Locally

### 1. Install dependencies (for tests)

```bash
npm install
``
```

### 2. Run unit tests

```bash
npm test

```

### 3. Serve locally (important for ES modules)

Example:

```bash
npx http-server
```

Do not open via file:// because ES modules require HTTP serving.

## Generate Calendar (.ics) File

```bash
node generate-ical.mjs

```

This produces:

`days.ics`

which can be imported into Google Calendar.

## Accessibility

- Semantic headings and ARIA attributes
- Keyboard-accessible interactive elements
- Lighthouse accessibility score target: 100%

---

## Team Workflow

- Feature branches with pull requests
- Shared logic centralized in `common.mjs`
- Code review before merge
- Automatic deployment via Netlify

---

## Status

Project completed according to rubric requirements, including:

- Dynamic recurring day calculation
- Shared logic between web UI and ICS generator
- Unit tests
- Accessibility compliance
- Deployed public website

---

## Authors

- [Mariia Serhiienko](https://github.com/Konvaly)
- [Abubakar Meigag](https://github.com/Abubakar-Meigag)
