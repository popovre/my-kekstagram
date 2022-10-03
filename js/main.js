// module2-task1
const inputText = 'hello';
let requiredLength = 5;
const getRequiredLength = (inputText,requiredLength) => {
  if (inputText.length<=requiredLength){
    return true;
  }
  return false;
}
console.log(getRequiredLength(inputText,requiredLength));

getRequiredLength(inputText,requiredLength);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
let getRandomIntInclusive = (min, max) => {
  if(min<0 || max<0){
    return NaN;
  }

  if(min>max){
    const reroll = min;
    min = max;
    max = reroll;
  }

  min = Math.ceil(min); //roundUp
  max = Math.floor(max); //roundDown
  let random = Math.random(); //random from 0 to 1 (floor)
  return Math.floor(random * max - random * min + random) + min; //Максимум и минимум включаются
}
console.log(getRandomIntInclusive(4,8));
