import {describe, expect, test} from '@jest/globals';
import {getRandomInteger} from '../utils/utils';

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
