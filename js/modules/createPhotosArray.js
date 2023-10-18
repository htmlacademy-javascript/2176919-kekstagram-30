import { PHOTO_COUNT, createComments, createNames, createDescriptions } from '../data/data';
import { getRandomArrayElement, createIdGenerator, getRandomInteger } from '../utils/utils';
const generatePhotoId = createIdGenerator();
const generateUrl = createIdGenerator();
const generateCommentId = createIdGenerator();
const createComment = () => ({
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: `${getRandomArrayElement(createComments())}`,
    name: `${getRandomArrayElement(createNames())}`,
});
const createPhoto = () => ({
    id: generatePhotoId(),
    url: `photos/${generateUrl()}.jpg`,
    description: `${getRandomArrayElement(createDescriptions())}`,
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});
export const createPhotos = Array.from({ length: PHOTO_COUNT }, createPhoto);
//# sourceMappingURL=createPhotosArray.js.map