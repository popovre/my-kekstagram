const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleSmallerButton = scaleFieldset.querySelector('.scale__control--smaller');
const scaleBiggerButton = scaleFieldset.querySelector('.scale__control--bigger');
const scaleValueInput = scaleFieldset.querySelector('.scale__control--value');
// console.log(scaleValue);

const onScaleSmallerButton = () => {
  let scaleValue = Number(scaleValueInput.value.delOneLast());
  scaleValue = scaleValue - 25;
  scaleValueInput.value = String(scaleValue) + '%';
};

scaleSmallerButton.addEventListener('click', onScaleSmallerButton);
