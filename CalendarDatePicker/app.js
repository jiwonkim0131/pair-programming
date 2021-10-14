const $body = document.querySelector('body');
const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

const currentDate = (() => {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const date = current.getDate();

  return { year, month, date };
})();

const nowDate = {
  year: currentDate.year,
  month: currentDate.month,
  nowSelected: 0
};

const updateNowDate = (year, month, selected = 0) => {
  nowDate.year = year;
  nowDate.month = month;
  nowDate.nowSelected = selected;
};

// today 함수
const isToday = date =>
  date === currentDate.date && currentDate.month === nowDate.month;

// 요일 구하기
const getDayNum = (year, month) => new Date(year, month, 1).getDay();

// 말일 구하기
const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();

// 말일의 요일 구하기
const getLastDayOfMonth = (year, month) =>
  new Date(year, month + 1, 0).getDay();

// 출력용 data formatting
const getFormattedDate = date => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

// 이전달, 이번달, 다음달 렌더링 할 배열 구하기
const getAllDates = nowDate => {
  const { year, month } = nowDate; // 기준

  // 이번달 1일의 요일
  const firstDayOfThisMonth = getDayNum(year, month);

  // 지난달의 말일
  const lastDateOfLastMonth = getLastDate(year, month - 1);

  // 이번달의 말일
  const lastDateOfThisMonth = getLastDate(year, month);

  // 이번달 말일의 요일
  const lastDayOfThisMonth = getLastDayOfMonth(year, month);

  // 지난 달 날짜 배열 구하기
  const lastMonthDays = Array.from(
    { length: firstDayOfThisMonth },
    (_, i) => lastDateOfLastMonth - i - 1
  ).reverse();

  // 이번 달 날짜 배열 구하기
  const currentMonthDays = Array.from(
    { length: lastDateOfThisMonth },
    (_, i) => i + 1
  );

  // 다음 날 시작 날짜 배열 구하기
  const nextMonthDays = Array.from(
    { length: 6 - lastDayOfThisMonth },
    (_, i) => i + 1
  );

  return { lastMonthDays, currentMonthDays, nextMonthDays };
};

const render = () => {
  const { lastMonthDays, currentMonthDays, nextMonthDays } =
    getAllDates(nowDate);
  const $calendarNav = document.createElement('div');

  $calendarNav.classList.add('calendar-nav');

  $calendarNav.innerHTML = ` <button type="button" class="nav-button prev">◀</button>
  <div class="calendar-title">
    <p class="title-month">${MONTH[nowDate.month]}</p>
    <p class="title-year">${nowDate.year}</p>
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
    isToday(thisDay)
      ? $thisDay.classList.add('date', 'today')
      : $thisDay.classList.add('date');
    $thisDay.textContent = thisDay;
    if (thisDay === nowDate.nowSelected) {
      $thisDay.classList.add('selected');
    }
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

// select 이벤트
$calendar.onclick = e => {
  if (e.target.classList.contains('disable')) return;

  if (e.target.classList.contains('date')) {
    [...$calendar.querySelectorAll('.date')].forEach($el =>
      $el.classList.toggle('selected', $el === e.target)
    );

    // date picker 날짜 출력
    const year = $calendar.querySelector('.title-year').textContent * 1;
    const month =
      MONTH.indexOf($calendar.querySelector('.title-month').textContent) * 1;
    const date = e.target.textContent * 1;

    updateNowDate(year, month, date);

    $datePicker.value = getFormattedDate(new Date(year, month, date));
    $calendar.classList.remove('active');
  }

  if (e.target.classList.contains('nav-button')) {
    $calendar.innerHTML = '';

    if (e.target.classList.contains('prev')) {
      nowDate.month === 0
        ? updateNowDate(nowDate.year - 1, 11, nowDate.nowSelected)
        : updateNowDate(nowDate.year, nowDate.month - 1, nowDate.nowSelected);
    } else {
      nowDate.month === 11
        ? updateNowDate(nowDate.year + 1, 0, nowDate.nowSelected)
        : updateNowDate(nowDate.year, nowDate.month + 1, nowDate.nowSelected);
    }

    if (nowDate.nowSelected)
      $datePicker.value = getFormattedDate(
        new Date(nowDate.year, nowDate.month, nowDate.nowSelected)
      );

    render();
  }
};

$datePicker.onclick = () => {
  $calendar.classList.add('active');
};

$body.onclick = e => {
  if (
    e.target.classList.contains('date-picker') ||
    e.target.matches('.calendar *') ||
    e.target.matches('.nav-button')
  )
    return;
  $calendar.classList.remove('active');
};
