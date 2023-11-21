import {createBigPhoto} from './rendering-big-photo'

const template: HTMLTemplateElement | null = document.querySelector('#picture');
const templatePicture: HTMLElement | null = template && template.content.querySelector('.picture');
export const picturesList: HTMLElement | null = document.querySelector('.pictures');
const picturesListFragment: DocumentFragment = document.createDocumentFragment();

export interface Comment {
  id: number,
  avatar: string,
  message: string,
  name: string,
}
export interface Photo {
  id: number,
  url: string,
  description: string,
  likes: number,
  comments: Comment[],
}

export const drawingThumbnails = (thumbnails: Photo[]) => {
  if (template && templatePicture && picturesList) {
  thumbnails.forEach(({url, likes, comments, description}) => {
    const picture: HTMLElement = <HTMLElement>templatePicture.cloneNode(true);
    const pictureImg: HTMLImageElement | null = picture.querySelector('.picture__img');
    const pictureLikes: HTMLSpanElement | null = picture.querySelector('.picture__likes');
    const pictureComments: HTMLSpanElement | null = picture.querySelector('.picture__comments');
    if (pictureImg && pictureLikes && pictureComments) {
      pictureImg.src = url;
      pictureImg.alt = description;
      pictureLikes.textContent = `${likes}`;
      pictureComments.textContent = `${comments.length}`;
    }
    picture.addEventListener('click', () => {
      createBigPhoto(url, likes, comments, description);
    });
    picturesListFragment.appendChild(picture);
  });

  picturesList.appendChild(picturesListFragment);
  }
};
