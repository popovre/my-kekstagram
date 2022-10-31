const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleSmallerButton = scaleFieldset.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleFieldset.querySelector('.scale__control--bigger');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
// console.log(scaleValue);
// давай сделаем обработчик на филдсет scaleFieldset, по всплытию будет один обработчик на 2 кнопки, если плюс, то scale будет плюс, если минус, то scale будет плюс.
const onScaleSmallerButton = () => {
  let scaleValue = Number(scaleValueInput.value.delOneLast());
  scaleValue = scaleValue - 25;
  scaleValueInput.value = String(scaleValue) + '%';
};

scaleSmallerButton.addEventListener('click', onScaleSmallerButton);
