import {pressesKeydown} from '../utils/utils';
import {sendData} from './communication';
import {clearsEffects} from './effects';
import Pristine from 'pristinejs';
import {showsSendingError} from './message';
import {setsDefaultScale} from './scale';

const loadingImage: HTMLElement | null = document.querySelector('.img-upload');
const imageEditingForm: HTMLElement | null = loadingImage && loadingImage.querySelector('.img-upload__overlay');
const imageSelection: HTMLInputElement | null = loadingImage && loadingImage.querySelector('.img-upload__input');
const imageCancel: HTMLElement | null = loadingImage && loadingImage.querySelector('.img-upload__cancel');
const imageForm: HTMLElement | null = loadingImage && loadingImage.querySelector('.img-upload__form');
const hashtagInput: HTMLInputElement | null = imageForm && imageForm.querySelector('.text__hashtags');
const descriptionInput: HTMLInputElement | null = imageForm && imageForm.querySelector('.text__description');
export const submitButton: HTMLButtonElement | null = document.querySelector('.img-upload__submit');
const nonEffects: HTMLInputElement | null = document.querySelector('#effect-none');

const clearsForm = () => {
  if (imageForm && nonEffects) {
    imageForm.reset();
    clearsEffects();
    nonEffects.checked = true;
    pristine.reset();
    setsDefaultScale();
  }
};

const openImageSelection = (): void => {
  imageEditingForm && imageEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export const closeImageSelection = (): void => {
  if (document.activeElement !== hashtagInput && document.activeElement !== descriptionInput && imageSelection) {
    imageEditingForm && imageEditingForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imageSelection.value = '';
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  clearsForm();
};

imageSelection && imageSelection.addEventListener('change', () => {
  openImageSelection();
});

imageCancel && imageCancel.addEventListener('click', () => {
  closeImageSelection();
});

export const onDocumentKeydown = pressesKeydown(closeImageSelection);
let error: string;

const validateHashtags = (value: string): boolean => {
  const hashtag: RegExp = /^#[a-zа-яё0-9]{1,19}$/i;
  const emptiness = '';
  const hashtags: string[] = value.toLowerCase().trim().split(' ').filter((el) => el !== emptiness);

  let result: boolean = true;

  if (!value) {
    return result;
  }

  if (hashtags.some((el) => el.includes('#', 1))) {
    error = 'Между хэштэгами должен быть хотя бы один пробел';
    return false;
  }

  if (hashtags.length > 5) {
    error = 'Хэштегов не должно быть больше пяти';
    return false;
  }

  hashtags.forEach((el: string) => {
    if (!hashtag.test(el)) {
      error = 'Такой хэштег не подойдет';
      result = false;
    }
  });

  const uniqueHashtags: string[] = [];
  hashtags.forEach ((el: string) => {
    if (uniqueHashtags.includes(el)) {
      error = 'Хэш-теги повторяются';
      result = false;
    } else {
      uniqueHashtags.push(el);
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

export const setFormSubmit = (onSuccess) => {
  imageForm && imageForm.addEventListener('submit', (evt: SubmitEvent) => {
    evt.preventDefault();
    const isValid: Function = pristine.validate();
    if (isValid && submitButton) {
      submitButton.disabled = true;
      sendData(new FormData(evt.target))
      .then(onSuccess)
      .then(clearsForm)
      .catch(showsSendingError)
      .finally(submitButton.disabled = false);
    }
  });
}
