import {onDocumentKeydown} from '../utils/utils';
import {Comment} from './createPhotosArray';

const bigPicture: HTMLElement | null = document.querySelector('.big-picture');
const bigComments: HTMLElement | null = bigPicture && bigPicture.querySelector('.social__comments');
const commentCounter: HTMLElement | null = bigPicture && bigPicture.querySelector('.social__comment-shown-count');
const commentLoader: HTMLElement | null = bigPicture && bigPicture.querySelector('.comments-loader');
const closeElement: HTMLElement | null = bigPicture && bigPicture.querySelector('.big-picture__cancel');
let showingComments: number = 5;
let commentsNew: Comment[] = [];

const onShowComments = (): void => {
  showingComments += 5;
  createBigComments(commentsNew);
  checkingNumberComments();
};

const checkingNumberComments = () => {
  if(commentCounter) {
    if (showingComments < commentsNew.length) {
      commentCounter.textContent = `${showingComments}`;
    } else {
      commentCounter.textContent = `${commentsNew.length}`;
    };
  }
}

const openBigPhoto = (): void => {
  bigPicture && bigPicture.classList.remove ('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handlerEsc);
  commentLoader && commentLoader.addEventListener('click', onShowComments);
};

const closeBigPhoto = (): void => {
  bigPicture && bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handlerEsc);
  showingComments = 5;
  if (commentCounter && commentLoader) {
    commentCounter.textContent = `${showingComments}`;
    commentLoader.removeEventListener('click', onShowComments);
  }
};

closeElement && closeElement.addEventListener('click', (): void => {
  closeBigPhoto();
});

const handlerEsc = onDocumentKeydown(closeBigPhoto);

export const createBigPhoto = (url: string, likes: number, comments: Comment[], description: string): void => {
  openBigPhoto();
  const bigPictureImg: HTMLImageElement | null = bigPicture && bigPicture.querySelector('img');
  const bigPictureLikes: HTMLSpanElement | null = bigPicture && bigPicture.querySelector('.likes-count');
  const bigCommentsCount: HTMLSpanElement | null = bigPicture && bigPicture.querySelector('.social__comment-total-count');
  const bigPictureDescription: HTMLElement | null = bigPicture && bigPicture.querySelector('.social__caption');
  if (bigPictureImg && bigPictureLikes && bigCommentsCount && bigPictureDescription) {
    bigPictureImg.src = url;
    bigPictureLikes.textContent = `${likes}`;
    bigCommentsCount.textContent = `${comments.length}`;
    bigPictureDescription.textContent = description;
  }
  createBigComments(comments);
  commentsNew = comments;
  checkingNumberComments();
};

const createBigComments = (comments: Comment[]): void => {

  const commentsAll: NodeListOf<Element> | null = bigComments && bigComments.querySelectorAll('.social__comment');
  const commentTemplate = commentsAll && commentsAll[0].cloneNode(true);

  commentsAll && commentsAll.forEach(comment => {
    comment.remove();
  });
  let commentCounter: number = 0;

  comments.forEach(({avatar, name, message}) => {
    if (commentCounter < showingComments) {
      const newComment:HTMLElement | null = commentTemplate && commentTemplate.cloneNode(true) as HTMLElement;
      const bigCommentAvatar: HTMLImageElement | null = newComment && newComment.querySelector('.social__picture');
      const bigCommentText: HTMLElement | null = newComment && newComment.querySelector('.social__text');
      if (bigCommentAvatar && bigCommentText && bigComments && newComment) {
        bigCommentAvatar.src = avatar;
        bigCommentAvatar.alt = name;
        bigCommentText.textContent = message;
        bigComments.appendChild(newComment);}
      commentCounter++;
    };
  });
}
