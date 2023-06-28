import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
let selectedDate = null;

startBtn.disabled = true;
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate > currentDate) {
      startBtn.disabled = false;
      Notiflix.Notify.info("Ви зробили правильний вибір");
    } else {
      startBtn.disabled = true;
      Notiflix.Notify.failure("Ой, але ця дата вже минула");
    };
  },
});

startBtn.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(() => {
    const countdown = selectedDate - Date.now();
    
    if (countdown > 0) {
      const timeComponents = convertMs(countdown);

        daysEl.innerHTML = addLeadingZero(timeComponents.days);
        hoursEl.innerHTML = addLeadingZero(timeComponents.hours);
        minutesEl.innerHTML = addLeadingZero(timeComponents.minutes);
        secondsEl.innerHTML = addLeadingZero(timeComponents.seconds);
    } else {
      clearInterval(timerId)
    };
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const watch = document.querySelector(".timer");
watch.style.display = 'flex';

const fieldEls = document.querySelectorAll('.field');
fieldEls.forEach(fieldEl => {
  fieldEl.style.textAlign = 'center';
  fieldEl.style.marginRight = '10px';
});

const valueEls = document.querySelectorAll('.value');
valueEls.forEach(valueEl => {
  valueEl.style.fontSize = '40px';
  valueEl.style.display = 'grid';
});

const labelEls = document.querySelectorAll('.label');
labelEls.forEach(labelEl => {
  labelEl.style.fontFamily = 'Roboto';
  labelEl.style.textTransform = 'uppercase';
  labelEl.style.fontSize = '12px';
});