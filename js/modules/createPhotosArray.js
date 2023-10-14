import '../data/data';
import {getRandomArrayElement} from '../utils/utils';
import {createIdGenerator} from '../utils/utils';
import {getRandomInteger} from '../utils/utils';

const generatePhotoId = createIdGenerator();
const generateUrl = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENTS)}`,
  name: `${getRandomArrayElement(NAMES)}`,
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const createPhotos = Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotos};
