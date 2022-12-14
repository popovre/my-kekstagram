import {isEscapeKey} from './utils.js';
import {sendImageData} from './api-fetch.js';
import {pristine} from './form-validation.js';
import {scaleFieldset, onScaleButtonClick, effectsList, onEffectRadioInput, previewImage, resetPreview, MAXSCALE, resetEffect} from './form-image.js';

const body = document.querySelector('body');
const uploadModal = body.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSubmit = uploadForm.querySelector('.img-upload__submit');

const findSubmitMessage = () => body.querySelector('.message');

const isSuccessMessage = () => findSubmitMessage().classList.contains('success');

const disableUploadSubmit = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'публикую...';
};

const activateUploadSubmit = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = 'опубликовать';
};

const addMessageListeners = () => {
  const messageButton = document.querySelector('.message-button');
  if (isSuccessMessage()) {
    document.addEventListener('keydown', onDocumentKeydown);
  }
  messageButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onDocumentClick);
};

const removeMessageListeners = () => {
  if (isSuccessMessage()) {
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  document.removeEventListener('click', onDocumentClick);
};

const addSubmitMessage = (status) => {
  const template = status ? successTemplate.cloneNode(true) : errorTemplate.cloneNode(true);
  document.body.appendChild(template);
  addMessageListeners();
};

const removeMessage = () => {
  removeMessageListeners();
  document.body.removeChild(findSubmitMessage());
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (findSubmitMessage()) {
      removeMessage();
    }
    else {
      closeUploadModal();
    }
  }
}

function onMessageButtonClick () {
  removeMessage('button');
}

function onDocumentClick (evt) {
  const element = document.querySelector('.message__inner');
  const withinBoundaries = element !== null && !element.contains(evt.target);
  if (withinBoundaries) {
    removeMessage('overlay');
  }
}

const onSuccessSend = (status) => {
  closeUploadModal();
  activateUploadSubmit();
  addSubmitMessage(status);
};

const onErrorSend = (status) => {
  addSubmitMessage(status);
  activateUploadSubmit();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    disableUploadSubmit();
    const formData = new FormData(evt.target);
    sendImageData(onSuccessSend, onErrorSend, formData);
  }
};

const addModalListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  scaleFieldset.addEventListener('click', onScaleButtonClick);
  effectsList.addEventListener('input', onEffectRadioInput);
  modalCloseButton.addEventListener('click', closeUploadModal);
};

const removeModalListeners = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleFieldset.removeEventListener('click', onScaleButtonClick);
  effectsList.removeEventListener('input', onEffectRadioInput);
  modalCloseButton.removeEventListener('click', closeUploadModal);
};

const openUploadModal = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  addModalListeners();
  resetPreview(previewImage, MAXSCALE);
  resetEffect();
};

function closeUploadModal () {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  removeModalListeners();
  uploadForm.reset();
  pristine.reset();
}

export {openUploadModal, closeUploadModal, body, uploadModal};
