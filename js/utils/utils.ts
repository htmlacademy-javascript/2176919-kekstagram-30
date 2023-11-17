export const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return function():number {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export const getRandomInteger = (a:number = 1, b:number = 500) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements:string[]) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt: KeyboardEvent): boolean => evt.key === 'Escape';

export const onDocumentKeydown = (handler: Function) => {
  const close = handler;
  return function(evt: KeyboardEvent) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
    }
  };
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
