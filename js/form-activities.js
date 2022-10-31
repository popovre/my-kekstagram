import {MINSCALE, MAXSCALE} from './constants.js';
import {getIntToFloat} from './utils.js';

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
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

  const scaleValueFloat = getIntToFloat(scaleValue);
  previewImage.className = '';
  previewImage.classList.add(`img-upload__preview--scale${scaleValueFloat}`);
};

export {scaleFieldset, onScaleButton};
