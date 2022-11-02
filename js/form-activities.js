import {MINSCALE, MAXSCALE, scaleClasses, effectClasses} from './constants.js';
import {getIntToFloat, removeCoincidenceClass} from './utils.js';
import './form-effects-features.js';


const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
let coincidenceStyle;

const previewDefault = (element, scaleDefault) => {
  previewImage.className = '';
  previewImage.style.transform = `scale(${getIntToFloat(scaleDefault) / 100})`;
};

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
  const scaleValueFloat = getIntToFloat(scaleValue);

  scaleValueInput.value = `${scaleValue}%`;
  previewImage.style.transform = `scale(${scaleValueFloat / 100})`;

  const previewImageClassList = Array.from(previewImage.classList);
  removeCoincidenceClass(previewImage, previewImageClassList, scaleClasses, coincidenceStyle);

  previewImage.classList.add(`img-upload__preview--scale${scaleValueFloat}`);
};

const onEffectsRadio = (evt) => {
  const previewImageClassList = Array.from(previewImage.classList);
  removeCoincidenceClass(previewImage, previewImageClassList, effectClasses, coincidenceStyle);

  previewImage.classList.add(`effects__preview--${evt.target.value}`);
};

export {scaleFieldset, onScaleButton, effectsList, onEffectsRadio, previewImage, previewDefault, MAXSCALE};
