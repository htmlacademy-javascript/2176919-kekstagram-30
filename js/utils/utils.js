export const createIdGenerator = () => {
    let lastGeneratedId = 0;
    return function () {
        lastGeneratedId += 1;
        return lastGeneratedId;
    };
};
export const getRandomInteger = (a = 1, b = 500) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};
export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
//# sourceMappingURL=utils.js.map