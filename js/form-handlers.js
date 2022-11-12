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
const errorButton = errorTemplate.querySelector('.error__button');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

const disableUploadSubmit = (domElement) => {
  domElement.disabled = true;
  domElement.textContent = 'публикую...';
};

const activateUploadSubmit = (domElement) => {
  domElement.disabled = false;
  domElement.textContent = 'опубликовать';
};

const createSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  document.body.appendChild(success);
};

const removeSuccessListeners = (escapeKey, buttonClick, mouseClick) => {
  const successButton = document.querySelector('.success__button');
  document.removeEventListener('keydown', escapeKey);
  successButton.removeEventListener('click', buttonClick);
  document.removeEventListener('click', mouseClick);
};

const removeSuccessMessage = () => {
  const element = document.querySelector('.success');
  removeSuccessListeners(onSuccessEcsKeydown, onSuccessButtonClick, onDocumentClick);
  document.body.removeChild(element);
};

const onSuccessEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
};
const onSuccessButtonClick = () => {
  removeSuccessMessage();

};
const onDocumentClick = (evt) => {
  const element = document.querySelector('.success__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeSuccessMessage();
  }
};

const addSuccessListeners = (escapeKey, buttonClick, mouseClick) => {
  const successButton = document.querySelector('.success__button');
  document.addEventListener('keydown', escapeKey);
  successButton.addEventListener('click', buttonClick);
  document.addEventListener('click', mouseClick);
};

const onSuccessSend = () => {
  closeUploadModal();
  createSuccessMessage();
  addSuccessListeners(onSuccessEcsKeydown, onSuccessButtonClick, onDocumentClick);
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
