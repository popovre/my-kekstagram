import {MINSCALE, MAXSCALE, EFFECTS} from './constants.js';

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

const sliderEffectFieldset = document.querySelector('.effect-level');
const sliderEffectWrapper = sliderEffectFieldset.querySelector('.effect-level__slider');
const sliderEffectInput = sliderEffectFieldset.querySelector('.effect-level__value');
const DEFAULT = EFFECTS[0];

let chosenEffect = DEFAULT;
const isDefault = () => chosenEffect === DEFAULT;

const previewDefault = (element, scaleDefault) => {
  previewImage.className = '';
  previewImage.style.transform = `scale(${Number.parseFloat(scaleDefault) / 100})`;
  previewImage.style.filter = 'none';
};

const onScaleButton = (evt) => {
  let scaleValue = +(scaleValueInput.value.slice(0, -1));
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
  previewImage.style.transform = `scale(${Number.parseFloat(scaleValue) / 100})`;
};

const getSliderUpdate = () => {
  sliderEffectFieldset.classList.remove('hidden');
  sliderEffectWrapper.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if (isDefault()) {
    sliderEffectFieldset.classList.add('hidden');
  }
};

const onEffectsRadio = (evt) => {
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  getSliderUpdate();
  previewImage.className = `effects__preview--${evt.target.value}`;
};

const onUpdateSliderEffect = () => {
  previewImage.style.filter = 'none';
  sliderEffectInput.value = '';

  if (isDefault()) {
    return;
  }

  const sliderValue = sliderEffectWrapper.noUiSlider.get();
  previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  sliderEffectInput.value = sliderValue;
};

noUiSlider.create(sliderEffectWrapper, {
  range: {
    min: DEFAULT.min,
    max: DEFAULT.max,
  },
  start: DEFAULT.max,
  step: DEFAULT.step,
  connect: 'lower',
});

const resetEffect = () => {
  chosenEffect = DEFAULT;
  getSliderUpdate();
};

getSliderUpdate();

sliderEffectWrapper.noUiSlider.on('update', onUpdateSliderEffect);

export {scaleFieldset, onScaleButton, effectsList, onEffectsRadio, previewImage, previewDefault, MAXSCALE, resetEffect};

