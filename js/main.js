import {showAlert} from './constants.js';
import {createLoader} from './api-fetch.js';
import {successTemplate, errorTemplate, addUploadFormSubmit} from './form-validation.js';
import {closeUploadModal} from'./form-upload.js';
import {getUsersGallery} from './miniatures.js';

createLoader(showAlert, getUsersGallery);
addUploadFormSubmit(closeUploadModal, successTemplate, errorTemplate);

