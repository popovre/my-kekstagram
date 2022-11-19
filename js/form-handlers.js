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
let messageElement;

const findSubmitMessage = () => {
  let element = body.querySelector('.success');
  if (element !== null) {
    return element;
  }
  element = body.querySelector('.error');
  return element;
};

const disableUploadSubmit = (domElement) => {
  domElement.disabled = true;
  domElement.textContent = 'публикую...';
};

const activateUploadSubmit = (domElement) => {
  domElement.disabled = false;
  domElement.textContent = 'опубликовать';
};

const addSubmitMessage = (status) => {
  if (status) {
    document.body.appendChild(successMessage);
  }
  else {
    document.body.appendChild(errorMessage);
  }
};

const removeMessageListeners = (onDocEscKeydown, onMessageButtonClick, onDocumentMouseClick, status) => {
  let messageButton = document.querySelector('.error__button');
  if (status) {
    messageButton = document.querySelector('.success__button');
    document.removeEventListener('keydown', onDocEscKeydown);
  }
  messageButton.removeEventListener('click', onMessageButtonClick);
  document.removeEventListener('click', onDocumentMouseClick);
};

const removeMessage = (status) => {
  messageElement = findSubmitMessage();
  if (status) {
    removeMessageListeners(onDocumentEcsKeydown, onSuccessButtonClick, onSuccessDocumentClick, status);
  }
  else {
    removeMessageListeners(onDocumentEcsKeydown, onErrorButtonClick, onErrorDocumentClick, status);
  }
  document.body.removeChild(messageElement);
};

function onDocumentEcsKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageElement = findSubmitMessage();
    if (messageElement === null) {
      closeUploadModal();
    }
    else if (messageElement !== null && messageElement.classList.contains('success')) {
      removeMessage(true);
    }
    else if (messageElement !== null && messageElement.classList.contains('error')) {
      removeMessage(false);
    }
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

function onErrorButtonClick () {
  removeMessage(false);
}

function onErrorDocumentClick (evt) {
  const element = document.querySelector('.error__inner');
  const withinBoundaries = evt.composedPath().includes(element);

  if (!withinBoundaries) {
    removeMessage(false);
    document.addEventListener('keydown', onDocumentEcsKeydown);
  }
}

const addMessageListeners = (onMessageButtonClick, onDocumentMouseClick, status) => {
  let messageButton = document.querySelector('.error__button');
  if (status) {
    document.addEventListener('keydown', onDocumentEcsKeydown);
    messageButton = document.querySelector('.success__button');
  }
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onDocumentMouseClick);
};

const onSuccessSend = (status) => {
  closeUploadModal();
  activateUploadSubmit(uploadSubmit);
  addSubmitMessage(status);
  addMessageListeners(onSuccessButtonClick, onSuccessDocumentClick, status);
};

const onErrorSend = (status) => {
  addSubmitMessage(status);
  activateUploadSubmit(uploadSubmit);
  addMessageListeners(onErrorButtonClick, onErrorDocumentClick, status);
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
  document.addEventListener('keydown', onDocumentEcsKeydown);
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
  document.removeEventListener('keydown', onDocumentEcsKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleFieldset.removeEventListener('click', onScaleButton);
  effectsList.removeEventListener('input', onEffectsRadio);
};

function closeUploadModal () {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  removeModalListeners();
  uploadForm.reset();
  pristine.reset();
}

export {openUploadModal, closeUploadModal, body, uploadModal};
