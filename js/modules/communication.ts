import {drawingThumbnails} from './drawing-thumbnails';
import {PHOTO_COUNT} from '../data/data';
import {closeImageSelection, setFormSubmit} from './form';
import {showsDataError, hidesDataError, showsSuccess} from './message'
import {initFilter} from './filters'

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};

const receivingError = () => {
  showsDataError();
  setTimeout(hidesDataError, 5000);
};

const load = (route, method = Method.GET, body = null, successText = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(successText);

export const getData = () => load(Route.GET_DATA);
export const sendData = (body) => load(Route.SEND_DATA, Method.POST, body, showsSuccess);

getData()
  .then((data) => {
    drawingThumbnails(data.slice(0, PHOTO_COUNT));
    initFilter(data);
  })
  .catch(receivingError);
setFormSubmit(closeImageSelection);
