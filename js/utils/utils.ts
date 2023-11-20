const TIMEOUT = 500;
export const getRandomInteger = (a:number, b:number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const isEscapeKey = (evt: KeyboardEvent): boolean => evt.key === 'Escape';

export const pressesKeydown = (handler: Function) => {
  const close = handler;
  return function(evt: KeyboardEvent) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  };
};

export const debounce = (callback, timeoutDelay = TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
