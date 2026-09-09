# Severa Calendar Presentation Mode

> A userscript that adds a presentation view mode button to Severa Calendar.

Every Monday in our weekly kick-off meeting at
[WTF Design](https://wtfdesign.fi/), we go through everybody's
[Severa](https://severa.com) calendars for the week for an overview on what
everybody is working on. This thing adds a presentation mode button to that
calendar view which hides all non-essentials and maximizes the calendar
within the browser-window. This serves to eliminate wasted space on people's
viewports and make the calendar more readable as well as having the benefit
of hiding presenter-specific overdue item counts and lists in the page header
and sidebar. It's also
- an excercise in
[CSS anchor-positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)
- a simple, yet robust customization of an SPA
- neat

## Requirements
- A user script host extension in your web browser
  - [Violentmonkey](https://violentmonkey.github.io/) is recommended and the only one tested

## Installation
- [Click here](https://github.com/WTF-Design/severa-calendar-presentation-mode/raw/main/script.user.js) to install/update

## Aknowledgements
- [Mir-Ismaili's location changeState proxy](https://stackoverflow.com/a/68418536)
- [Uicons by Flaticon](https://www.flaticon.com/uicons)

## Changelog
- v1.1.0:
  - Slight increase of calendar entry title font size while presenting
    - We'll make this responsive/controllable yet
  - Only insert button when it's not already there
- v1.0.1: Fix calendar editing popup positioning
  - It was also getting anchored to the window on account of containing a
    `calendarview` class.
- v1.0.0: Initial release
