// let backgroundBody = document.querySelector('body');
// backgroundBody.classList.add('tomato');
// backgroundBody.classList.remove('tomato');
// проверка: подключил main.js к странице

// module2-task1
const inputText = 'hello, Guys';
let requiredLength = 5;
const getRequiredLength = (inputText,requiredLength) => {
  if (inputText.length===requiredLength){
    return console.log('true');
  }
  return console.log('false');
}

getRequiredLength(inputText,requiredLength)

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
  console.log(min,'roundUp min');

  max = Math.floor(max); //roundDown
  console.log(max,'roundDown max');

  let random = Math.random(); //random from 0 to 1 (floor)
  console.log(random, 'random from 0 to 1 (floor)');

  return Math.floor(random * max - random * min + random) + min; //Максимум и минимум включаются
}
console.log(getRandomIntInclusive(4,8), 'random int from area', 'Math.floor(random * max - random * min + random) + min');
