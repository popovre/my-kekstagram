import {showAlert} from './constants.js';
import {getImageData} from './api-fetch.js';
import './form-upload.js';
import {renderGallery} from './miniatures.js';

getImageData(renderGallery, showAlert);
