import {createBigPhoto} from './renderingBigPhoto'

const template: HTMLTemplateElement | null = document.querySelector('#picture');
const templatePicture: HTMLElement | null = template && template.content.querySelector('.picture');
export const picturesList: HTMLElement | null = document.querySelector('.pictures');
const picturesListFragment: DocumentFragment = document.createDocumentFragment();

interface Comment {
  id: number,
  avatar: string,
  message: string,
  name: string,
}
interface Photo {
  id: number,
  url: string,
  description: string,
  likes: number,
  comments: Comment[],
}

export const drawingThumbnails = (thumbnails: Photo[]) => {
  if (template && templatePicture && picturesList) {
  thumbnails.forEach(({url, likes, comments, description}) => {
    const pictureElement: HTMLElement = <HTMLElement>templatePicture.cloneNode(true);
    const pictureImg: HTMLImageElement | null = pictureElement.querySelector('.picture__img');
    const pictureLikes: HTMLSpanElement | null = pictureElement.querySelector('.picture__likes');
    const pictureComments: HTMLSpanElement | null = pictureElement.querySelector('.picture__comments');
    if (pictureImg && pictureLikes && pictureComments) {
      pictureImg.src = url;
      pictureImg.alt = description;
      pictureLikes.textContent = `${likes}`;
      pictureComments.textContent = `${comments.length}`;
    }
    pictureElement.addEventListener('click', () => {
      createBigPhoto(url, likes, comments, description);
    });
    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
  }
};
