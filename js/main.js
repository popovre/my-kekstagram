import {showAlert} from './constants.js';
import {getImageData} from './api-fetch.js';
import './form-upload.js';
import {createGallery} from './miniatures.js';

getImageData(createGallery, showAlert);
