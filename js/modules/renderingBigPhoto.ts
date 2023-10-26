import {isEscapeKey} from '../utils/utils';

const bigPicture: HTMLElement = document.querySelector('.big-picture');
const bigComments: HTMLElement = bigPicture.querySelector('.social__comments');
const commentCounter: HTMLElement = bigPicture.querySelector('.social__comment-count');
const commentLoader: HTMLElement = bigPicture.querySelector('.comments-loader');
const closeElement: HTMLElement = bigPicture.querySelector('.big-picture__cancel');
commentCounter.classList.add('hidden');
commentLoader.classList.add('hidden');

const onDocumentKeydown = (evt: Event): void => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const openBigPhoto = (): void => {
  bigPicture.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPhoto = (): void => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeElement.addEventListener('click', (): void => {
  closeBigPhoto();
});

export const createBigPhoto = (url: string, likes: number, comments: Comment[], description: string): void => {
  openBigPhoto();
  const bigPictureImg = bigPicture.querySelector('img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigCommentsCount = bigPicture.querySelector('.social__comment-total-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigCommentsCount.textContent = `${comments.length}`;
  bigPictureDescription.textContent = description;
  createBigComments(comments);
};

const createBigComments = (comments: Comment[]): void => {

  const commentsAll = bigComments.querySelectorAll('.social__comment');
  const commentTemplate = commentsAll[0].cloneNode(true);

  commentsAll.forEach(comment => {
    comment.remove();
  });
  let commentCounter: number = 0;

  comments.forEach(({avatar, name, message}) => {
    if (commentCounter < 5) {
      const newComment = commentTemplate.cloneNode(true);
      const bigCommentAvatar = newComment.querySelector('.social__picture');
      const bigCommentText = newComment.querySelector('.social__text');

      bigCommentAvatar.src = avatar;
      bigCommentAvatar.alt = name;
      bigCommentText.textContent = message;
      bigComments.appendChild(newComment);
      commentCounter++;
    };
  });
}
