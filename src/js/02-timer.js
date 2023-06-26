import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
startBtn.style.fontSize = "20px";
startBtn.style.borderRadius = '10px'
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      window.alert("Please choose a date in the future");
    };
  },
});
startBtn.addEventListener('click', startTimer)
function startTimer() {
  setInterval(() => {
    const countdown = fp.selectedDates[0] - Date.now();
    const timeComponents = convertMs(countdown);
    timerFace(timeComponents);
  }, 1000);
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
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
};
function timerFace({ days, hours, minutes, seconds }) {
  days.textContent = addLeadingZero(days);
  hours.textContent = addLeadingZero(hours);
  minutes.textContent = addLeadingZero(minutes);
  seconds.textContent = addLeadingZero(seconds);
}


