import {isEscapeKey} from './utils.js';
import {sendImageData} from './api-fetch.js';
import {pristine} from './form-validation.js';
import {scaleFieldset, onScaleButton, effectsList, onEffectsRadio, previewImage, previewDefault, MAXSCALE, resetEffect} from './form-image.js';

const body = document.querySelector('body');
const uploadModal = body.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

const onModalEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

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
    document.body.appendChild(successMessage);
  }
  else {
    document.body.appendChild(errorMessage);
  }
};

const removeMessageListeners = (escapeKey, buttonClick, mouseClick, status) => {
  let messageButton = document.querySelector('.error__button');
  if (status) {
    messageButton = document.querySelector('.success__button');
  }
  document.removeEventListener('keydown', escapeKey);
  messageButton.removeEventListener('click', buttonClick);
  document.removeEventListener('click', mouseClick);
};

const removeMessage = (status) => {
  let element = document.querySelector('.error');
  if (status) {
    element = document.querySelector('.success');
    removeMessageListeners(onSuccessEcsKeydown, onSuccessButtonClick, onSuccessDocumentClick, status);
  }
  else {
    removeMessageListeners(onErrorEcsKeydown, onErrorButtonClick, onErrorDocumentClick, status);
  }
  document.body.removeChild(element);
};

function onSuccessEcsKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage(true);
  }
}

function onSuccessButtonClick () {
  removeMessage(true);
}

function onSuccessDocumentClick (evt) {
  const element = document.querySelector('.success__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeMessage(true);
  }
}

function onErrorEcsKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage(false);
    document.addEventListener('keydown', onModalEcsKeydown);
  }
}

function onErrorButtonClick () {
  removeMessage(false);
  document.addEventListener('keydown', onModalEcsKeydown);
}

function onErrorDocumentClick (evt) {
  const element = document.querySelector('.error__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeMessage(false);
    document.addEventListener('keydown', onModalEcsKeydown);
  }
}

const addMessageListeners = (escapeKey, buttonClick, mouseClick, status) => {
  let messageButton = document.querySelector('.error__button');
  if (status) {
    messageButton = document.querySelector('.success__button');
  }
  messageButton.addEventListener('click', buttonClick);
  document.addEventListener('keydown', escapeKey);
  document.addEventListener('click', mouseClick);
};

const onSuccessSend = (status) => {
  closeUploadModal();
  activateUploadSubmit(uploadSubmit);
  createMessage(status);
  addMessageListeners(onSuccessEcsKeydown, onSuccessButtonClick, onSuccessDocumentClick, status);
};

const onErrorSend = (status) => {
  createMessage(status);
  activateUploadSubmit(uploadSubmit);
  document.removeEventListener('keydown', onModalEcsKeydown);
  addMessageListeners(onErrorEcsKeydown, onErrorButtonClick, onErrorDocumentClick, status);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    disableUploadSubmit(uploadSubmit);
    const formData = new FormData(evt.target);
    sendImageData(onSuccessSend, onErrorSend, formData);
  }
};

const addModalListeners = () => {
  document.addEventListener('keydown', onModalEcsKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  scaleFieldset.addEventListener('click', onScaleButton);
  effectsList.addEventListener('input',onEffectsRadio);
};

const openUploadModal = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  addModalListeners();
  previewDefault(previewImage, MAXSCALE);
  resetEffect();
};

const removeModalListeners = () => {
  document.removeEventListener('keydown', onModalEcsKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleFieldset.removeEventListener('click', onScaleButton);
  effectsList.removeEventListener('input', onEffectsRadio);
};

function closeUploadModal () {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  removeModalListeners();
  uploadForm.reset();
}

export {openUploadModal, closeUploadModal, body, uploadModal};
