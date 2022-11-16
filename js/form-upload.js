import {openUploadModal, closeUploadModal, body, uploadModal} from './form-handlers.js';

const uploadFile = body.querySelector('#upload-file');
const modalCloseButton = uploadModal.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', () => {
  openUploadModal();
});

modalCloseButton.addEventListener('click', () => {
  closeUploadModal();
});
