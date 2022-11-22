import {MINSCALE, MAXSCALE, imageEffects} from './constants.js';

const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');

const sliderEffectFieldset = document.querySelector('.effect-level');
const sliderEffectWrapper = sliderEffectFieldset.querySelector('.effect-level__slider');
const sliderEffectInput = sliderEffectFieldset.querySelector('.effect-level__value');
const defaultEffect = imageEffects[0];

let chosenEffect = defaultEffect;
const isDefault = () => chosenEffect === defaultEffect;

const resetPreview = (element, scaleDefault) => {
  previewImage.className = '';
  previewImage.style.transform = `scale(${Number.parseFloat(scaleDefault) / 100})`;
  previewImage.style.filter = 'none';
};

const onScaleButtonClick = (evt) => {
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

const updateSlider = () => {
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

const onEffectRadioInput = (evt) => {
  chosenEffect = imageEffects.find((effect) => effect.name === evt.target.value);
  updateSlider();
  previewImage.className = `effects__preview--${evt.target.value}`;
};

const onSliderEffectUpdate = () => {
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
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
});

const resetEffect = () => {
  chosenEffect = defaultEffect;
  updateSlider();
};

updateSlider();

sliderEffectWrapper.noUiSlider.on('update', onSliderEffectUpdate);

export {scaleFieldset, onScaleButtonClick, effectsList, onEffectRadioInput, previewImage, resetPreview, MAXSCALE, resetEffect};

