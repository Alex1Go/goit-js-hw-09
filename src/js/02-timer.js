import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
    } else {
      startBtn.disabled = true;
      window.alert("Please choose a date in the future");
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
daysEl.style.display = 'grid';
hoursEl.style.display = 'grid';
minutesEl.style.display = 'grid';
secondsEl.style.display = 'grid';
daysEl.style.fontSize = '40px';
hoursEl.style.fontSize = '40px';
minutesEl.style.fontSize = '40px';
secondsEl.style.fontSize = '40px';
daysEl.style.marginRight = '10px';
hoursEl.style.marginRight = '10px';
minutesEl.style.marginRight = '30px';


