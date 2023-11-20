import {Photo, drawingThumbnails} from './drawingThumbnails';
import {PHOTO_COUNT} from '../data/data';
import {closeImageSelection, setFormSubmit} from './form';
import {showsDataError, hidesDataError, showsSendingError, showsSuccess} from './message'
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

const receivingError = (): void => {
  showsDataError();
  setTimeout(hidesDataError, 5000);
};

const load = (route: string, errorText?: (()=> void) | null, method = Method.GET, body?: FormData, successText?: (()=> void) | null): any =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(successText)
    .catch(errorText);

export const getData = () => load(Route.GET_DATA, receivingError);
export const sendData = (body: FormData) => load(Route.SEND_DATA, showsSendingError, Method.POST, body, showsSuccess);

getData()
  .then((data: Photo[]) => {
    drawingThumbnails(data.slice(0, PHOTO_COUNT));
    initFilter(data);
  });
setFormSubmit(closeImageSelection);
