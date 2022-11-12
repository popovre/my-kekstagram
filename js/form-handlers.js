import {isEscapeKey} from './utils.js';
import {sendImageData} from './api-fetch.js';
import {pristine} from './form-validation.js';
import {scaleFieldset, onScaleButton, effectsList, onEffectsRadio, previewImage, previewDefault, MAXSCALE, resetEffect} from './form-image.js';

const body = document.querySelector('body');
const uploadModal = body.querySelector('.img-upload__overlay');

const uploadForm = document.querySelector('.img-upload__form');

const onModalEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEcsKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  scaleFieldset.addEventListener('click', onScaleButton);
  effectsList.addEventListener('input',onEffectsRadio);
  previewDefault(previewImage, MAXSCALE);
  resetEffect();
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEcsKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleFieldset.removeEventListener('click', onScaleButton);
  effectsList.removeEventListener('input',onEffectsRadio);
  uploadForm.reset();
};

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

const disableUploadSubmit = (domElement) => {
  domElement.disabled = true;
  domElement.textContent = 'публикую...';
};

const activateUploadSubmit = (domElement) => {
  domElement.disabled = false;
  domElement.textContent = 'опубликовать';
};

const onSuccessSend = () => {
  closeUploadModal();
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(success);
};

const onErrorSend = () => {
  const error = errorTemplate.cloneNode(true);
  document.body.appendChild(error);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  disableUploadSubmit(uploadSubmit);

  if(isValid) {
    const formData = new FormData(evt.target);
    sendImageData(onSuccessSend, onErrorSend, formData);
  }
  activateUploadSubmit(uploadSubmit);
};

export {openUploadModal, closeUploadModal, body, uploadModal};
