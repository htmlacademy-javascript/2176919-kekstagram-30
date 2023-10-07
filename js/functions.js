const checkingStringLength = (string, maxlength) => string.length <= maxlength;

const isPalindrome = (string) => {
  const result = string.replaceAll(' ', '').toLowerCase();
  let j = -1;
  for(let i = 0; i < result.length / 2; i++) {
    if (result[i] !== result.at(j)) {
      return false;
    }
    j -= 1;
  }
  return true;
};

const extractingNumbers = (string) => {
  const newString = string.toString();
  let result = '';
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      result += newString[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return Number(result);
};

checkingStringLength('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
extractingNumbers(1.5);
