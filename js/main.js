const getRequiredLength = (text,length) => {
  if (text.length <= length){
    return true;
  }
  return false;
};
getRequiredLength('hi',5);

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

// module4-task1
const GALLERY_LENGTH = 25;
const DESCRIPTIONS = [
  'спортзал',
  'видеокарта',
  'компьютер',
  'солнышко',
  'древесный кенгуру',
  'хомячки',
  'мыши',
  'поляна',
  'деревце',
  'калина',
  'верблюд',
  'котик',
  'машины',
  'горы',
  'мотоциклы',
  'стол',
  'розетка',
  'фронтенд разработка',
  'бэкенд разработчик',
  'язык С или С++',
  'микроконтроллер',
  'STM32',
  'Induction motor',
  'ACED2021',
  'IEEE',
];

const getPhotoDescription = function(index){
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomIntInclusive(15,200),
    comments: getRandomIntInclusive(0,200)
  };
};

const galleryPhotos = Array.from({ length:GALLERY_LENGTH }, (value, ind) => getPhotoDescription(ind));

