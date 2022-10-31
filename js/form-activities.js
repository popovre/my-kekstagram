import {MINSCALE, MAXSCALE} from './constants.js';

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const onScaleButton = (evt) => {
  let scaleValue = +(scaleValueInput.value.delOneLast());
  if (evt.target.classList.contains('scale__control--smaller')){
    scaleValue -= MINSCALE;
  }
  else if (evt.target.classList.contains('scale__control--bigger')){
    scaleValue += MINSCALE;
  }
  if (scaleValue < MINSCALE) {
    scaleValue = MINSCALE;
  }
  else if (scaleValue > MAXSCALE) {
    scaleValue = MAXSCALE;
  }
  scaleValueInput.value = `${scaleValue}%`;
};

export {scaleFieldset, onScaleButton};
