import {PHOTO_COUNT} from '../data/data';

const scale: HTMLElement | null = document.querySelector('.scale');
const scalablePhoto: HTMLElement | null = document.querySelector('.img-upload__preview img');
const scaleControlSmaller: HTMLElement | null = scale && scale.querySelector('.scale__control--smaller');
const scaleControlBigger: HTMLElement | null = scale && scale.querySelector('.scale__control--bigger');
const scaleControlValue: HTMLInputElement | null = scale && scale.querySelector('.scale__control--value');
const DEFAULT_SCALE = 100;

export const setsDefaultScale = () => {
  if (scaleControlValue && scalablePhoto) {
    scaleControlValue.value = `${DEFAULT_SCALE}%`;
    scalablePhoto.style.transform = `scale(1)`;
  }
}

if (scale && scalablePhoto && scaleControlSmaller && scaleControlBigger && scaleControlValue) {
  scale.addEventListener('click', (evt) => {
    let valueScale = +scaleControlValue.value.replace('%', '');
    if (evt.target === scaleControlSmaller) {
      if (valueScale > PHOTO_COUNT) {
        scaleControlValue.value = `${valueScale - PHOTO_COUNT}%`;
        valueScale -= PHOTO_COUNT;
        scalablePhoto.style.transform = `scale(0.${valueScale})`;
      }
    }
    if (evt.target === scaleControlBigger) {
      if (valueScale < DEFAULT_SCALE) {
        scaleControlValue.value = `${valueScale + PHOTO_COUNT}%`;
        valueScale += PHOTO_COUNT;
        scalablePhoto.style.transform = `scale(${valueScale / DEFAULT_SCALE})`;
      }
    }
  })
}
