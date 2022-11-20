import {openUploadModal, body} from './form-handlers.js';

const uploadFile = body.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  openUploadModal();
});

