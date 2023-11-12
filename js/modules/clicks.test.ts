/**
 * @jest-environment jsdom
 */
import {describe, expect, test} from '@jest/globals';

const clickEvent = new MouseEvent('click', {
  button: 0
});

const button = document.querySelector('.pictures');
const bigPhoto = document.querySelector('.big-picture');
const photoOpen = () => {
  if (bigPhoto && bigPhoto.classList.contains('hidden')) {
    return false;
  }
  return true;
}

describe('клик на миниатюре', () => {
  test('открытие большой фотографии', () => {
    button && button.dispatchEvent(clickEvent);
    expect(photoOpen()).toBe(true);
  });
});
