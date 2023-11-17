import {describe, expect, test} from '@jest/globals';
import {getRandomInteger, getRandomArrayElement} from '../utils/utils';
import {createComments} from '../data/data';

describe('getRandomInteger', () => {
  test('диапазон от 1000 до 20', () => {
    expect(getRandomInteger(1000, 20)).toBeGreaterThanOrEqual(20);
    expect(getRandomInteger(1000, 20)).toBeLessThanOrEqual(1000);
  });
  test('диапазон от -1 до -200', () => {
    expect(getRandomInteger(-1, -200)).toBeGreaterThanOrEqual(-200);
    expect(getRandomInteger(-1, -200)).toBeLessThanOrEqual(-1);
  });
  test('дефолтное значение', () => {
    expect(getRandomInteger()).toBeGreaterThanOrEqual(1);
    expect(getRandomInteger()).toBeLessThanOrEqual(500);
  });
});

describe('getRandomArrayElement', () => {
  test('возвращается ли строка из массива', () => {
    expect(getRandomArrayElement(createComments())).not.toBeUndefined();
  });
});

