const inputText = 'hello';
const requiredLength = 5;
const getRequiredLength = (Text,Length) => {
  if (Text.length <= Length){
    return true;
  }
  return false;
};
getRequiredLength(inputText,requiredLength);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (min, max) => {
  if(min < 0 || max < 0){
    return NaN;
  }

  if(min > max){
    const reroll = min;
    min = max;
    max = reroll;
  }

  min = Math.ceil(min); //roundUp
  max = Math.floor(max); //roundDown
  const random = Math.random(); //random from 0 to 1 (floor)
  return Math.floor(random * max - random * min + random) + min; //Максимум и минимум включаются
};
getRandomIntInclusive(4,8);
