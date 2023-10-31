import {onDocumentKeydown} from '../utils/utils';

const loadingImage: HTMLElement = document.querySelector('.img-upload');

const imageEditingForm: HTMLElement = loadingImage.querySelector('.img-upload__overlay');
const imageSelection: HTMLInputElement = loadingImage.querySelector('.img-upload__input');
const imageCansel: HTMLElement = loadingImage.querySelector('.img-upload__cancel');
const imageForm: HTMLElement = loadingImage.querySelector('.img-upload__form');
const hashtagInput: HTMLElement = imageForm.querySelector('.text__hashtags');
const descriptionInput: HTMLElement = imageForm.querySelector('.text__description');

const openImageSelection = (): void => {
  imageEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handlerEsc);
};

const closeImageSelection = (): void => {
  if (document.activeElement !== hashtagInput && document.activeElement !== descriptionInput) {
    imageEditingForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageSelection.value = '';
    document.removeEventListener('keydown', handlerEsc);
  }
};

imageSelection.addEventListener('change', () => {
  openImageSelection();
});

imageCansel.addEventListener('click', () => {
  closeImageSelection();
});

const handlerEsc = onDocumentKeydown(closeImageSelection);
let error: string;

const validateHashtags = (value: string): boolean => {
  const hashtag: RegExp = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags: string[] = value.trim().split(' ');
  let result: boolean = true;
  if (!value) {
    return result;
  }
  if (hashtags.length > 5) {
    error = 'Хэштегов не должно быть больше пяти';
    result = false;
  }
  hashtags.forEach((el: string) => {
    if (!hashtag.test(el)) {
      error = 'Введён невалидный хэш-тег';
      result = false;
    }
  });
  const uniqueHashtags = new Set();
  hashtags.forEach ((el: string) => {
    if (uniqueHashtags.has(el)) {
      error = 'Хэш-теги повторяются';
      result = false;
    } else {
      uniqueHashtags.add(el);
    }
  })
  return result;
};

const getHashtagsErrorMessage = () => {
  return error;
};

const validateDescription = (value: string) => value.length <= 140;

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, validateHashtags, getHashtagsErrorMessage);
pristine.addValidator(descriptionInput, validateDescription, 'длина комментария больше 140 символов.');

imageForm.addEventListener('submit', (evt: SubmitEvent) => {
  const isValid: Function = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
