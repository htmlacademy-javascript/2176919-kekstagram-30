/**
 * @jest-environment jsdom
 */
import {describe, expect, test} from '@jest/globals';
import {getData} from './communication';

describe('getData', () => {
  test('проверяем получение данных', async() => {
    const data = await getData()
    expect(data).toBe(true);
  });
});
