import './events.js';
import './editing.js';
import './upload.js';

const getRequiredLength = (text,length) => {
  if (text.length <= length){
    return true;
  }
  return false;
};

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if(min < 0 || max < 0 || min === max){
    return NaN;
  }

  if(min > max){
    const reroll = min;
    min = max;
    max = reroll;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.random();
  return Math.floor(random * max - random * min + random) + min;
};

export {getRequiredLength,getRandomIntInclusive};
