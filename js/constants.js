const MINDESCRIPTIONLENGT = 20;
const MAXDESCRIPTIONLENGT = 140;
export {MINDESCRIPTIONLENGT,MAXDESCRIPTIONLENGT};

const MINSCALE = 25;
const MAXSCALE = 100;
export {MINSCALE, MAXSCALE};

const effectClasses = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

export {effectClasses};

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

const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'галерея недоступна, обновите страницу...';

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '2% 2%';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.borderBottomRightRadius = '10%';
  alertContainer.style.borderBottomLeftRadius = '10%';
  alertContainer.style.backgroundColor = '#cc6600';
  alertContainer.textContent = ALERT_MESSAGE;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export{showAlert};
