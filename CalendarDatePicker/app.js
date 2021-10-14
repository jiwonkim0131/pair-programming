const $calendar = document.querySelector('.calendar');
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const currentDate = (() => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const date = current.getDate();

  return { year, month, date };
})();

// 요일 구하기
const getDay = (year, month) => new Date(year, month, 1).getDay();

// 말일 구하기
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();

// 이전달, 이번달, 다음달 렌더링 할 배열 구하기
const getAllDates = currentDate => {
  const { year, month } = currentDate; // 기준

  // 이번달 1일의 요일
  const firstDayofThisMonth = getDay(year, month);

  // 지난달의 말일
  const lastDateofLastMonth = getLastDate(year, month - 1);

  // 이번달의 말일
  const lastDateofThisMonth = getLastDate(year, month);

  // 지난 달 날짜 배열 구하기
  const lastMonthDays = Array.from(
    { length: firstDayofThisMonth },
    (_, i) => lastDateofLastMonth - i - 1
  ).reverse();

  // 이번 달 날짜 배열 구하기
  const currentMonthDays = Array.from(
    { length: lastDateofThisMonth },
    (_, i) => i + 1
  );

  // 다음 날 시작 날짜 배열 구하기
  const nextMonthDays = Array.from(
    { length: 6 - lastDateofThisMonth },
    (_, i) => i + 1
  );

  return { lastMonthDays, currentMonthDays, nextMonthDays };
};

const render = () => {
  const { lastMonthDays, currentMonthDays, nextMonthDays } =
    getAllDates(currentDate);
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

  lastMonthDays.forEach(beforeDay => {
    const $beforeDay = document.createElement('div');
    $beforeDay.classList.add('date', 'disable');
    $beforeDay.textContent = beforeDay;
    $fragment.append($beforeDay);
  });

  currentMonthDays.forEach(thisDay => {
    const $thisDay = document.createElement('div');
    $thisDay.classList.add('date');
    $thisDay.textContent = thisDay;
    $fragment.append($thisDay);
  });

  nextMonthDays.forEach(afterDay => {
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
