// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInp = document.querySelector('[name="delay"]');
const radioBtnFlflld = document.querySelector('[value="fulfilled"]');
const radioBtnRjctd = document.querySelector('[value="rejected"]');
const submitBtn = document.querySelector('.create-button');

form.addEventListener('submit', event => {
  event.preventDefault();
  const targetDelay = delayInp.value;
  const checkedRadio = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkedRadio === 'fulfilled') {
        resolve(targetDelay);
      } else {
        reject(targetDelay);
      }
    }, targetDelay);
  });
  promise
    .then(result => {
      iziToast.success({
        title: 'OK',
        titleColor: '#FFFFFF',
        iconColor: '#fffff',
        iconUrl: '../img/svg/ok-icon.svg',
        message: 'Fulfilled promise in ' + `${result}` + 'ms',
        messageColor: '#FFFFFF',
        backgroundColor: '#59a10d',
        position: 'topRight',
        progressBar: true,
        progressBarColor: ' #326101',
        closeOnClick: true,
        timeout: 3500,
      });
      console.log(`✅ Fulfilled promise in ${result}ms`);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        iconColor: '#fffff',
        iconUrl: '../img/svg/wn-ic.svg',
        message: 'Rejected promise in ' + `${error}` + 'ms',
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        progressBar: true,
        progressBarColor: ' #B51B1B',
        closeOnClick: true,
        timeout: 3500,
      });
      console.log(`❌ Rejected promise in ${error}ms`);
    });
});
