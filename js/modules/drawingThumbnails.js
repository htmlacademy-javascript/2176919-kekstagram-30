import { createPhotos } from './createPhotosArray';
const template = document.querySelector('#picture');
const templatePicture = template.content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const drawingThumbnail = createPhotos;
drawingThumbnail.forEach(({ url, description, likes, comments }) => {
  const pictureElement = templatePicture.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  const pictureLikes = pictureElement.querySelector('.picture__likes');
  const pictureComments = pictureElement.querySelector('.picture__comments');
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLikes.textContent = `${likes}`;
  pictureComments.textContent = `${comments.length}`;
  picturesListFragment.appendChild(pictureElement);
});
picturesList.appendChild(picturesListFragment);
//# sourceMappingURL=drawingThumbnails.js.map
