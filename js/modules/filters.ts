import {getRandomInteger, debounce} from '../utils/utils';
import {drawingThumbnails, Photo} from './drawing-thumbnails';

const imgFilters: HTMLElement | null = document.querySelector('.img-filters');
const defaultButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-default');
const randomButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-random');
const discussedButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-discussed');
const MAX_RANDOM_FILTER = 10;

const replacesActivity = (button: HTMLElement | null) => {
  imgFilters?.querySelector('.img-filters__button--active')?.classList.remove('img-filters__button--active');
  button?.classList.add('img-filters__button--active');
};

const clearsOldThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((el) => el.remove());
};

export const initFilter = (data: Photo[]) => {
  imgFilters?.classList.remove('img-filters--inactive');
  imgFilters?.addEventListener('click', (evt: Event) => {
    clearsOldThumbnails();
    if(evt.target?.closest('#filter-default')) {
      replacesActivity(defaultButton);
      debounce(drawingThumbnails(showDefault(data)));
    };
    if(evt.target?.closest('#filter-random')) {
      replacesActivity(randomButton);
      debounce(drawingThumbnails(showRandom(data)));
    };
    if(evt.target?.closest('#filter-discussed')) {
      replacesActivity(discussedButton);
      debounce(drawingThumbnails(showDiscussed(data)));
    };
  });
};

const sortsThumbnails = (thumbnail1, thumbnail2) => thumbnail2.comments.length - thumbnail1.comments.length;

const showDefault = (thumbnails) => thumbnails;

const showRandom = (thumbnails) => {
  const randomIndexes: number[] = [];
  while(randomIndexes.length < thumbnails.length && randomIndexes.length < MAX_RANDOM_FILTER) {
    let index = getRandomInteger(0, thumbnails.length - 1);
    if (!randomIndexes.includes(index)) {
      randomIndexes.push(index);
    }
  }
  return randomIndexes.map((index) => thumbnails[index]);
};

const showDiscussed = (thumbnails) => thumbnails.slice().sort(sortsThumbnails);
