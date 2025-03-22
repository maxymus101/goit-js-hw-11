// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate && userSelectedDate <= currentDate) {
      iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        iconColor: '#fffff',
        iconUrl: '../img/svg/wn-ic.svg',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        progressBar: true,
        progressBarColor: ' #B51B1B',
        closeOnClick: true,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const inputField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#start-btn');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const fp = flatpickr(inputField, options); // flatpickr
let userSelectedDate;
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputField.disabled = true;

  const targetTime = new Date(userSelectedDate).getTime();

  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const deltaTime = targetTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      inputField.disabled = false;
    } else {
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});
