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

const validateDescriptionTextLimit = (value) => value.length < (MAXDESCRIPTIONLENGT);

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateDescriptionTextLimit,
  'Максимальная длина 140 символов'
);

const validateDescriptionText = (value) => value.length >= MINDESCRIPTIONLENGT && value.length <= MAXDESCRIPTIONLENGT;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateDescriptionText,
  'Введите от 20 до 140 символов'
);

export {pristine};

