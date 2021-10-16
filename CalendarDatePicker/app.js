// DOM Nodes ======================
const $body = document.querySelector('body');
const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');

// State  ======================
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

let selectedDate;

// State Function  ======================
const baseDate = (() => {
  const base = new Date();
  const year = base.getFullYear();
  const month = base.getMonth();
  const date = base.getDate();

  return { year, month, date };
})();

const currentDate = {
  year: baseDate.year,
  month: baseDate.month,
  nowSelected: 0
};

const updateCurrentDate = (year, month, selected = 0) => {
  currentDate.year = year;
  currentDate.month = month;
  currentDate.nowSelected = selected;
};

const isToday = date =>
  date === baseDate.date &&
  baseDate.month === currentDate.month &&
  baseDate.year === currentDate.year;

const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();

const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

const getAllDates = nowDate => {
  const { year, month } = nowDate;

  const firstDayOfThisMonth = getFirstDay(year, month);
  const lastDateOfLastMonth = getLastDate(year, month - 1);
  const lastDateOfThisMonth = getLastDate(year, month);
  const lastDayOfThisMonth = getLastDayOfMonth(year, month);

  const dateOfLastMonth = Array.from(
    { length: firstDayOfThisMonth },
    (_, i) => lastDateOfLastMonth - firstDayOfThisMonth + i + 1
  );
  const dateOfThisMonth = Array.from(
    { length: lastDateOfThisMonth },
    (_, i) => i + 1
  );
  const dateOfNextMonth = Array.from(
    { length: 6 - lastDayOfThisMonth },
    (_, i) => i + 1
  );

  return { dateOfLastMonth, dateOfThisMonth, dateOfNextMonth };
};

const render = () => {
  const { dateOfLastMonth, dateOfThisMonth, dateOfNextMonth } =
    getAllDates(currentDate);
  const $calendarNav = document.createElement('div');
  $calendarNav.classList.add('calendar-nav');

  $calendarNav.innerHTML = ` <button type="button" class="nav-button prev">◀</button>
  <div class="calendar-title">
    <p class="title-month">${MONTH[currentDate.month]}</p>
    <p class="title-year">${currentDate.year}</p>
  </div>
  <button type="button" class="nav-button next">▶</button>`;

  const $calendarGrid = document.createElement('div');
  $calendarGrid.classList.add('calendar-grid');

  const $fragmentForGrid = document.createDocumentFragment();

  DAYS.forEach(day => {
    const $day = document.createElement('div');
    $day.classList.add('day');
    $day.textContent = day;
    $fragmentForGrid.append($day);
  });

  dateOfLastMonth.forEach(date => {
    const $beforeDay = document.createElement('div');
    $beforeDay.classList.add('date', 'disable');
    $beforeDay.textContent = date;
    $fragmentForGrid.append($beforeDay);
  });

  dateOfThisMonth.forEach(date => {
    const $thisDay = document.createElement('div');
    $thisDay.dataset.date = `${currentDate.year}-${
      currentDate.month + 1 < 10
        ? '0' + (currentDate.month + 1)
        : currentDate.month + 1
    }-${date < 10 ? '0' + date : date}`;
    isToday(date)
      ? $thisDay.classList.add('date', 'today')
      : $thisDay.classList.add('date');
    $thisDay.textContent = date;
    $thisDay.dataset.date === selectedDate
      ? $thisDay.classList.add('date', 'selected')
      : $thisDay.classList.add('date');

    $fragmentForGrid.append($thisDay);
  });

  dateOfNextMonth.forEach(date => {
    const $afterDay = document.createElement('div');
    $afterDay.classList.add('date', 'disable');
    $afterDay.textContent = date;
    $fragmentForGrid.append($afterDay);
  });

  $calendarGrid.append($fragmentForGrid);
  $calendar.append($calendarNav);
  $calendar.append($calendarGrid);
};

// Event Bindings  ======================
window.addEventListener('DOMContentLoaded', render);

$calendar.onclick = e => {
  e.stopPropagation();

  if (e.target.classList.contains('disable')) return;

  if (e.target.classList.contains('date')) {
    [...$calendar.querySelectorAll('.date')].forEach($el =>
      $el.classList.toggle('selected', $el === e.target)
    );

    const year = $calendar.querySelector('.title-year').textContent * 1;
    const month =
      MONTH.indexOf($calendar.querySelector('.title-month').textContent) * 1;
    const date = e.target.textContent * 1;

    updateCurrentDate(year, month, date);

    selectedDate = e.target.dataset.date;
    $datePicker.value = e.target.dataset.date;
    $calendar.classList.remove('active');
  }

  if (e.target.classList.contains('nav-button')) {
    $calendar.innerHTML = '';

    if (e.target.classList.contains('prev')) {
      currentDate.month === 0
        ? updateCurrentDate(currentDate.year - 1, 11, currentDate.nowSelected)
        : updateCurrentDate(
            currentDate.year,
            currentDate.month - 1,
            currentDate.nowSelected
          );
    } else {
      currentDate.month === 11
        ? updateCurrentDate(currentDate.year + 1, 0, currentDate.nowSelected)
        : updateCurrentDate(
            currentDate.year,
            currentDate.month + 1,
            currentDate.nowSelected
          );
    }

    render();
  }
};

$datePicker.onclick = e => {
  e.stopPropagation();
  $calendar.classList.add('active');
};

$body.onclick = () => {
  $calendar.classList.remove('active');
};
