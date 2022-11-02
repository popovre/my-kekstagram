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
export {GALLERY_LENGTH,DESCRIPTIONS};

const MINDESCRIPTIONLENGT = 20;
const MAXDESCRIPTIONLENGT = 140;
export {MINDESCRIPTIONLENGT,MAXDESCRIPTIONLENGT};

const MINSCALE = 25;
const MAXSCALE = 100;
export {MINSCALE, MAXSCALE};

const scaleClasses = [
  'img-upload__preview--scale25',
  'img-upload__preview--scale50',
  'img-upload__preview--scale75',
  'img-upload__preview--scale100'
];

const effectClasses = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

export {scaleClasses,effectClasses};

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

export {EFFECTS};
