import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadModal = body.querySelector('.img-upload__overlay');
const modalCloseButton = uploadModal.querySelector('.img-upload__cancel');
const modalSubmitButton = uploadModal.querySelector('.img-upload__submit');

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

  document.removeEventListener('keydown', onModalEcsKeydown);
};

uploadFile.addEventListener('click', (evt) => {
  evt.preventDefault();
  openUploadModal();
});

modalCloseButton.addEventListener('click', () => {
  closeUploadModal();
});


