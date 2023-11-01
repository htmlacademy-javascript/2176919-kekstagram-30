import {createPhotos} from './createPhotosArray';
import {createBigPhoto} from './renderingBigPhoto'

const template: HTMLTemplateElement = document.querySelector('#picture');
const templatePicture: HTMLElement = template.content.querySelector('.picture');
const picturesList: HTMLElement = document.querySelector('.pictures');
const picturesListFragment: DocumentFragment = document.createDocumentFragment();

export const drawingThumbnail = createPhotos;

if (template && templatePicture && picturesList) {
drawingThumbnail.forEach(({url,likes, comments, description}) => {
  const pictureElement: HTMLElement = <HTMLElement>templatePicture.cloneNode(true);
  const pictureImg: HTMLImageElement = pictureElement.querySelector('.picture__img');
  const pictureLikes: HTMLSpanElement = pictureElement.querySelector('.picture__likes');
  const pictureComments: HTMLSpanElement = pictureElement.querySelector('.picture__comments');

  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = `${likes}`;
  pictureComments.textContent = `${comments.length}`;
  pictureElement.addEventListener('click', () => {
    createBigPhoto(url, likes, comments, description);
  });
  picturesListFragment.appendChild(pictureElement);
});

picturesList.appendChild(picturesListFragment);
}
