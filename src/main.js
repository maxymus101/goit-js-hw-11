import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchOnQuery } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.form');
const searchInp = document.querySelector('input[name="search-text"]');
const submitBtn = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInp.value.trim();
  loader.style.display = 'inline-flex';

  fetchOnQuery(query)
    .then(data => {
      loader.style.display = 'none';

      renderImages(data.hits, gallery);
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(error => {
      loader.style.display = 'none';
      gallery.innerHTML = '';
      iziToast.error({
        title: '',
        titleColor: '#FFFFFF',
        iconColor: '#fffff',
        iconUrl: '../img/svg/wn-ic.svg',
        messageColor: '#FFFFFF',
        backgroundColor: '#ef4040',
        position: 'topRight',
        progressBar: true,
        progressBarColor: ' #B51B1B',
        closeOnClick: true,
        timeout: 3500,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    });
});
