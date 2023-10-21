import {createPhotos} from './createPhotosArray';

const template: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#picture');
const templatePicture: HTMLElement = <HTMLElement>template.content.querySelector('.picture');
const picturesList: HTMLElement = <HTMLElement>document.querySelector('.pictures');
const picturesListFragment: DocumentFragment = document.createDocumentFragment();

const drawingThumbnail = createPhotos;

drawingThumbnail.forEach(({url, description, likes, comments}) => {
  const pictureElement: HTMLElement = <HTMLElement>templatePicture.cloneNode(true);
  const pictureImg: HTMLImageElement = <HTMLImageElement>pictureElement.querySelector('.picture__img');
  const pictureLikes: HTMLSpanElement = <HTMLSpanElement>pictureElement.querySelector('.picture__likes');
  const pictureComments: HTMLSpanElement = <HTMLSpanElement>pictureElement.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = `${likes}`;
  pictureComments.textContent = `${comments.length}`;
  picturesListFragment.appendChild(pictureElement);
});

picturesList.appendChild(picturesListFragment);
