import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
const timerEls = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let targetDate;

const inputOptions = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = new Date(selectedDates[0]);

    const isDateValid = Date.now() < targetDate.getTime();
    if (!isDateValid) {
      showErrorToast();
    }

    setElementAccessibility(buttonEl, isDateValid);
  },
};

inputEl.addEventListener('focus', handleInputFocus);

buttonEl.addEventListener('click', handleButtonClick);

function handleInputFocus() {
  inputOptions.defaultDate = inputEl.value || new Date();
  flatpickr(inputEl, inputOptions);
  setElementAccessibility(buttonEl);
}

function handleButtonClick() {
  let timeLeft = 0;
  const intervalId = setInterval(() => {
    timeLeft = targetDate.getTime() - Date.now();

    if (timeLeft > 0) {
      const timeObject = convertMs(timeLeft);

      for (const [key, elem] of Object.entries(timerEls)) {
        const displayValue = String(timeObject[key]).padStart(2, '0');
        elem.textContent = displayValue;
      }
    } else {
      clearInterval(intervalId);
      setElementAccessibility(inputEl, true);
    }
  }, 1000);

  setElementAccessibility(buttonEl);
  setElementAccessibility(inputEl);
}

function showErrorToast() {
  iziToast.show({
    title: 'Error',
    titleColor: '#FFF',
    titleSize: '16px',
    message: 'Please choose a date in the future',
    messageColor: '#FFF',
    messageSize: '16px',
    position: 'topCenter',
    backgroundColor: '#EF4040',
    timeout: 500000,
    close: false,
    buttons: [
      [
        `<button type="button" id="izi-close-button">
          <img src="./x.svg" alt="" width="16px" height="16px" />
        </button>`,
        function (instance, toast) {
          instance.hide({}, toast, 'buttonName');
        },
      ],
    ],
  });
}

function setElementAccessibility(domElement, enable = false) {
  domElement.classList[enable ? 'remove' : 'add']('disabled-element');
  if (enable && domElement.classList.contains('disabled-element')) {
    domElement.blur();
  }
}

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
}

setElementAccessibility(buttonEl, true);
