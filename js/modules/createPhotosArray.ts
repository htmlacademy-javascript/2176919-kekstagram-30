import {PHOTO_COUNT, createComments, createNames, createDescriptions} from '../data/data';
import {getRandomArrayElement, createIdGenerator, getRandomInteger} from '../utils/utils';

const generatePhotoId = createIdGenerator();
const generateUrl = createIdGenerator();
const generateCommentId = createIdGenerator();

export interface Comment {
  id: number,
  avatar: string,
  message: string,
  name: string,
}

const createComment = (): Comment => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(createComments())}`,
  name: `${getRandomArrayElement(createNames())}`,
});

interface Photo {
  id: number,
  url: string,
  description: string,
  likes: number,
  comments: Comment[],
}

const createPhoto = (): Photo => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: `${getRandomArrayElement(createDescriptions())}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

export const createPhotos: Photo[] = Array.from({length: PHOTO_COUNT}, createPhoto);
