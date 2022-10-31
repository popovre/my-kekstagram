import {MINSCALE, MAXSCALE, scaleClasses, effectClasses} from './constants.js';
import {getIntToFloat} from './utils.js';


const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

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
  const previewImageClassList = Array.from(previewImage.classList);

  if (previewImageClassList.length > 0) {
    let coincidenceScaleClass = '';
    for (let i = 0; i < previewImageClassList.length; i++) {
      coincidenceScaleClass = scaleClasses.find((currentClass) => currentClass === previewImageClassList[i]);
      
      if (coincidenceScaleClass.length !== 0) {
        previewImage.classList.remove(coincidenceScaleClass);
        break;}
    }
  }
  previewImage.classList.add(`img-upload__preview--scale${scaleValueFloat}`);
};

const onEffectsRadio = (evt) => {
  previewImage.classList.add(`effects__preview--${evt.target.value}`);
};

export {scaleFieldset, onScaleButton, effectsList, onEffectsRadio};
