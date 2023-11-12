import {drawingThumbnails} from './drawingThumbnails';
import {PHOTO_COUNT} from '../data/data';
import {closeImageSelection, setFormSubmit} from './form';
import {showsDataError, hidesDataError} from './message'

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const checkDataError = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

const getData = () => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then(checkDataError)
  .then((data) => {
    drawingThumbnails(data.slice(0, PHOTO_COUNT));
  })
  .catch(() => {
    showsDataError();
    setTimeout(hidesDataError, 5000);
  });
};

export const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  });

getData();
setFormSubmit(closeImageSelection);
