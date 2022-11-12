import {MINDESCRIPTIONLENGT, MAXDESCRIPTIONLENGT} from './constants.js';
import {createUploader} from './api-fetch.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const uploadForm = document.querySelector('.img-upload__form');

const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

const disableUploadSubmit = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'публикую...';
};

const activateUploadSubmit = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = 'опубликовать';
};

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

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  disableUploadSubmit();
  if(isValid) {
    createUploader(close, success, error, new FormData(evt.target));
  }
  else{
    activateUploadSubmit();
  }
};


export{successTemplate, errorTemplate};

export {onUploadFormSubmit};


