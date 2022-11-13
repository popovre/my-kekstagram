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

const createMessage = (status) => {
  if (status) {
    const success = successTemplate.cloneNode(true);
    document.body.appendChild(success);
  }
  else {
    const error = errorTemplate.cloneNode(true);
    document.body.appendChild(error);
  }
};

const removeMessageListeners = (escapeKey, buttonClick, mouseClick, status) => {
  if (status) {
    const messageButton = document.querySelector('.success__button');
    document.removeEventListener('keydown', escapeKey);
    messageButton.removeEventListener('click', buttonClick);
    document.removeEventListener('click', mouseClick);
  }
  else {
    const messageButton = document.querySelector('.error__button');
    document.removeEventListener('keydown', escapeKey);
    messageButton.removeEventListener('click', buttonClick);
    document.removeEventListener('click', mouseClick);
  }
};

const removeMessage = (status) => {
  if (status) {
    const element = document.querySelector('.success');
    removeMessageListeners(onSuccessEcsKeydown, onSuccessButtonClick, onSuccessDocumentClick, status);
    document.body.removeChild(element);
  }
  else {
    const element = document.querySelector('.error');
    removeMessageListeners(onErrorEcsKeydown, onErrorButtonClick, onErrorDocumentClick, status);
    document.body.removeChild(element);
  }
};

const onSuccessEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage(true);
  }
};
const onSuccessButtonClick = () => {
  removeMessage(true);
};
const onSuccessDocumentClick = (evt) => {
  const element = document.querySelector('.success__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeMessage(true);
  }
};

const onErrorEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage(false);
    // добавляем эскейп модалки
    document.addEventListener('keydown', onModalEcsKeydown);
  }
};
const onErrorButtonClick = () => {
  removeMessage(false);
  // добавляем эскейп модалки
  document.addEventListener('keydown', onModalEcsKeydown);
};
const onErrorDocumentClick = (evt) => {
  const element = document.querySelector('.error__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeMessage(false);
    // добавляем эскейп модалки
    document.addEventListener('keydown', onModalEcsKeydown);
  }
};

const addMessageListeners = (escapeKey, buttonClick, mouseClick, status) => {
  if (status) {
    const messageButton = document.querySelector('.success__button');
    document.addEventListener('keydown', escapeKey);
    messageButton.addEventListener('click', buttonClick);
    document.addEventListener('click', mouseClick);
  }
  else {
    const messageButton = document.querySelector('.error__button');
    document.addEventListener('keydown', escapeKey);
    messageButton.addEventListener('click', buttonClick);
    document.addEventListener('click', mouseClick);
  }
};

const onSuccessSend = () => {
  closeUploadModal();
  const status = true;
  createMessage(status);
  addMessageListeners(onSuccessEcsKeydown, onSuccessButtonClick, onSuccessDocumentClick, status);
};

const onErrorSend = () => {
  const status = false;
  createMessage(status);
  // сносим эскейп модалки
  document.removeEventListener('keydown', onModalEcsKeydown);
  //
  addMessageListeners(onErrorEcsKeydown, onErrorButtonClick, onErrorDocumentClick, status);
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
