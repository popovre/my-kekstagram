
const sliderEffectFieldset = document.querySelector('.effect-level');
const sliderEffectWrapper = sliderEffectFieldset.querySelector('.effect-level__slider');
const sliderEffectInput = sliderEffectFieldset.querySelector('.effect-level__value');

sliderEffectInput.value = 0;
noUiSlider.create(sliderEffectWrapper, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderEffectWrapper.noUiSlider.on('update', () => {
  sliderEffectInput.value = sliderEffectWrapper.noUiSlider.get();
});
