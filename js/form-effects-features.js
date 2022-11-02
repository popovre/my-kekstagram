import {EFFECTS} from './constants.js'

const sliderEffectFieldset = document.querySelector('.effect-level');
const sliderEffectWrapper = sliderEffectFieldset.querySelector('.effect-level__slider');
const sliderEffectInput = sliderEffectFieldset.querySelector('.effect-level__value');
const DEFAULT = EFFECTS[0];

sliderEffectInput.value = 0;
noUiSlider.create(sliderEffectWrapper, {
  range: {
    min: DEFAULT.min,
    max: DEFAULT.max,
  },
  start: DEFAULT.start,
  step: DEFAULT.step,
  connect: 'lower',
});

sliderEffectWrapper.noUiSlider.on('update', () => {
  sliderEffectInput.value = sliderEffectWrapper.noUiSlider.get();
});
