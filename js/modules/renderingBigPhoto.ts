import {isEscapeKey} from '../utils/utils';
import {Comment} from './createPhotosArray';

const bigPicture: HTMLElement = document.querySelector('.big-picture');
const bigComments: HTMLElement = bigPicture.querySelector('.social__comments');
const commentCounter: HTMLElement = bigPicture.querySelector('.social__comment-shown-count');
const commentLoader: HTMLElement = bigPicture.querySelector('.comments-loader');
const closeElement: HTMLElement = bigPicture.querySelector('.big-picture__cancel');
let showingComments: number = 5;
let commentsNew: Comment[] = [];

const onDocumentKeydown = (evt: KeyboardEvent): void => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const onShowComments = (): void => {
  showingComments += 5;
  createBigComments(commentsNew);
  checkingNumberComments();
};

const checkingNumberComments = () => {
  if (showingComments < commentsNew.length) {
    commentCounter.textContent = `${showingComments}`;
  } else {
    commentCounter.textContent = `${commentsNew.length}`;
  };
}

const openBigPhoto = (): void => {
  bigPicture.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentLoader.addEventListener('click', onShowComments);
};

const closeBigPhoto = (): void => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  showingComments = 5;
  commentCounter.textContent = `${showingComments}`;
  commentLoader.removeEventListener('click', onShowComments);
}

closeElement.addEventListener('click', (): void => {
  closeBigPhoto();
});

export const createBigPhoto = (url: string, likes: number, comments: Comment[], description: string): void => {
  openBigPhoto();
  const bigPictureImg: HTMLImageElement = bigPicture.querySelector('img');
  const bigPictureLikes: HTMLSpanElement = bigPicture.querySelector('.likes-count');
  const bigCommentsCount: HTMLSpanElement = bigPicture.querySelector('.social__comment-total-count');
  const bigPictureDescription: HTMLElement = bigPicture.querySelector('.social__caption');

  bigPictureImg.src = url;
  bigPictureLikes.textContent = `${likes}`;
  bigCommentsCount.textContent = `${comments.length}`;
  bigPictureDescription.textContent = description;
  createBigComments(comments);
  commentsNew = comments;
  checkingNumberComments();
};

const createBigComments = (comments: Comment[]): void => {

  const commentsAll: NodeListOf<Element> = bigComments.querySelectorAll('.social__comment');
  const commentTemplate = commentsAll[0].cloneNode(true);

  commentsAll.forEach(comment => {
    comment.remove();
  });
  let commentCounter: number = 0;

  comments.forEach(({avatar, name, message}) => {
    if (commentCounter < showingComments) {
      const newComment: Node = commentTemplate.cloneNode(true);
      const bigCommentAvatar: HTMLImageElement = newComment.querySelector('.social__picture');
      const bigCommentText: HTMLElement = newComment.querySelector('.social__text');

      bigCommentAvatar.src = avatar;
      bigCommentAvatar.alt = name;
      bigCommentText.textContent = message;
      bigComments.appendChild(newComment);
      commentCounter++;
    };
  });
}
