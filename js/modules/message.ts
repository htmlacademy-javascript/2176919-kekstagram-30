import {onDocumentKeydown} from '../utils/utils';
import {handlerEsc} from './form';

const templateSuccess: HTMLTemplateElement | null = document.querySelector('#success');
const success: HTMLElement | null = templateSuccess && templateSuccess.content.querySelector('.success');
const templateSendingError: HTMLTemplateElement | null = document.querySelector('#error');
const sendingErrorContainer: HTMLElement | null = templateSendingError && templateSendingError.content.querySelector('.error');

const showMessage = (element: HTMLElement | null, buttonClass: string) => {
  if (element) {
    document.body.append(element);
  }
  element?.querySelector(buttonClass)?.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.removeEventListener('keydown', handlerEsc);
};

const hideMessage = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  existsElement?.remove();
  document.removeEventListener('keydown', onMessageKeydown);
  document.addEventListener('keydown', handlerEsc);
};

const onCloseButtonClick = () => {
  hideMessage();
}

export const showsSuccess = () => {
  showMessage(success, '.success__button');
};

export const showsSendingError = () => {
  showMessage(sendingErrorContainer, '.error__button');
};

const onMessageKeydown = onDocumentKeydown(hideMessage);

const onBodyClick = (evt: Event) => {
  if (evt.target?.closest('.success__inner') || evt.target?.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

const templateDataError: HTMLTemplateElement | null = document.querySelector('#data-error');
const dataErrorContainer: HTMLElement | null = templateDataError && templateDataError.content.querySelector('.data-error');

export const showsDataError = () => {
  const dataError = dataErrorContainer?.cloneNode(true);
  if (dataError) {
    document.body.appendChild(dataError);
  }
};

export const hidesDataError = () => {
  const error = document.querySelector('.data-error');
  if (error) {
    document.body.removeChild(error);
  }
}
