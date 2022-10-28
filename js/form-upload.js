import {isEscapeKey} from './utils.js';
import {uploadForm, onUploadFormSubmit} from './form-validation.js';

const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadModal = body.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('.img-upload__cancel');
const modalScaleControl = uploadModal.querySelector('.scale__control--value');
const modalEffectLevel = uploadModal.querySelector('.effect-level__value');
const modalEffectRadio = uploadModal.querySelectorAll('.effects__radio');
const modalComment = uploadModal.querySelectorAll('.text__description');

const onModalEcsKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadModal.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openUploadModal = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEcsKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  modalScaleControl.value = '';
  modalEffectLevel.value = '';
  modalEffectRadio.forEach((input) => {
    input.value = '';
  });
  modalComment.value = '';
  document.removeEventListener('keydown', onModalEcsKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  uploadForm.reset();
};

uploadFile.addEventListener('change', () => {
  openUploadModal();
});

modalCloseButton.addEventListener('click', () => {
  closeUploadModal();
});
