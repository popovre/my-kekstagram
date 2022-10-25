import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadModal = body.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('.img-upload__cancel');
let modalScaleControl = uploadModal.querySelector('.scale__control--value');
let modalEffectLevel = uploadModal.querySelector('.effect-level__value');
let modalEffectRadio = uploadModal.querySelectorAll('.effects__radio');
let modalComment = uploadModal.querySelectorAll('.img-upload__text');

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
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadFile.value = '';
  modalScaleControl.value = '';
  modalEffectRadio.forEach((input) => {
    input.value = '';
  });
  modalComment.value = '';
  document.removeEventListener('keydown', onModalEcsKeydown);
};

uploadFile.addEventListener('change', () => {
  openUploadModal();
});

modalCloseButton.addEventListener('click', () => {
  closeUploadModal();
});

openUploadModal();

