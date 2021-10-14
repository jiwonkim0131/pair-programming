const $calendar = document.querySelector('.calendar');
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// dummy data
// const beforeDays = [26, 27, 28, 29, 30];
const thisDays = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31
];
// const afterDays = [1, 2, 3, 4, 5, 6];

const currentDate = () => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const date = current.getDate();

  return { current, year, month, date };
};

const getDate = currentDate();
const getLasteDate = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();
const getLastDay = (year, month) => new Date(year, month + 1, 0).getDay();
const getCurrentDay = getDate.current.getDay();
const lasteDateThisMonth = getLastDay(getDate.year, getDate.month);

const beforeDays = Array.from(
  { length: getFirstDay(getDate.year, getDate.month) },
  (_, i) => getLasteDate(getDate.year, getDate.month) - i - 1
).reverse();

const afterDays = Array.from(
  { length: 7 - lasteDateThisMonth - 1 },
  (_, i) => i + 1
);
const render = () => {
  const $calendarNav = document.createElement('div');
  $calendarNav.classList.add('calendar-nav');

  $calendarNav.innerHTML = ` <button type="button" class="nav-button prev">◀</button>
  <div class="calendar-title">
    <p class="title-month">OCT</p>
    <p class="title-year">2021</p>
  </div>
  <button type="button" class="nav-button next">▶</button>`;

  const $calendarGrid = document.createElement('div');
  $calendarGrid.classList.add('calendar-grid');

  const $fragment = document.createDocumentFragment();
  DAYS.forEach(day => {
    const $day = document.createElement('div');
    $day.classList.add('day');
    $day.textContent = day;
    $fragment.append($day);
  });

  beforeDays.forEach(beforeDay => {
    const $beforeDay = document.createElement('div');
    $beforeDay.classList.add('date', 'disable');
    $beforeDay.textContent = beforeDay;
    $fragment.append($beforeDay);
  });

  thisDays.forEach(thisDay => {
    const $thisDay = document.createElement('div');
    $thisDay.classList.add('date');
    $thisDay.textContent = thisDay;
    $fragment.append($thisDay);
  });

  afterDays.forEach(afterDay => {
    const $afterDay = document.createElement('div');
    $afterDay.classList.add('date', 'disable');
    $afterDay.textContent = afterDay;
    $fragment.append($afterDay);
  });

  $calendarGrid.append($fragment);
  $calendar.append($calendarNav);
  $calendar.append($calendarGrid);
};

render();
