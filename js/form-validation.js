import {MINDESCRIPTIONLENGT, MAXDESCRIPTIONLENGT} from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__description--error',
  errorClass: 'text__description--invalid',
  successClass: 'text__description--valid',
  errorTextTag: 'div',
});

const validateDescriptionText = (value) => value.length >= MINDESCRIPTIONLENGT && value.length <= MAXDESCRIPTIONLENGT;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateDescriptionText,
  `Введите от ${MINDESCRIPTIONLENGT} до ${MAXDESCRIPTIONLENGT} символов`
);

export {pristine};

