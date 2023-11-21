import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const effectLevel: HTMLElement | null = document.querySelector('.img-upload__effect-level');
const effectLevelSlider: HTMLElement | null = effectLevel && effectLevel.querySelector('.effect-level__slider');
const effectLevelValue: HTMLInputElement | null = effectLevel && effectLevel.querySelector('.effect-level__value');
const imgUploadPreview: HTMLElement | null = document.querySelector('.img-upload__preview img');
const effects: HTMLElement | null = document.querySelector('.effects__list');

export const clearsEffects = () => {
  if (imgUploadPreview && effectLevel) {
    imgUploadPreview.style.filter = 'none';
    effectLevel.classList.add('hidden');
  }
};

if (effectLevel && effectLevelSlider && effectLevelValue && imgUploadPreview && effects) {
  effectLevel.classList.add('hidden');

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  let effect: string;
  let units: string;

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = `${Number(effectLevelSlider.noUiSlider.get())}`;
    imgUploadPreview.style.filter = effect + effectLevelValue.value + units + ')';
  });

  const resetsSettings = () => {
    effectLevelValue.value = '';
    effectLevel.classList.remove('hidden');
  };

  const getOptions = (min: number, max: number, step: number) => {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: max,
      step:step,
    });
  };

  effects.addEventListener('change', (evt) => {
    switch(evt.target.value) {
      case 'chrome':
        resetsSettings();
        effect = 'grayscale(';
        units = '';
        getOptions(0, 1, 0.1);
        break;
      case 'sepia':
        resetsSettings();
        effect = 'sepia(';
        units = '';
        getOptions(0, 1, 0.1);
        break;
      case 'marvin':
        resetsSettings();
        effect = 'invert(';
        units = '%';
        getOptions(0, 100, 1);
        break;
      case 'phobos':
        resetsSettings();
        effect = 'blur(';
        units = 'px';
        getOptions(0, 3, 0.1);
        break;
      case 'heat':
        resetsSettings();
        effect = 'brightness(';
        units = '';
        getOptions(1, 3, 0.1);
        break;
      default:
        clearsEffects();
    }
  });
}
