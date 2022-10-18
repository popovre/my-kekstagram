import {createGalleryPhotos} from './data.js';
const picturesWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getUsersPhotos = createGalleryPhotos();
const pictureFragment = document.createDocumentFragment();

getUsersPhotos.forEach((image) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  const pictureImage = pictureTemplateClone.querySelector('.picture__img');
  const pictureLikes = pictureTemplateClone.querySelector('.picture__likes');
  const pictureComments = pictureTemplateClone.querySelector('.picture__comments');

  pictureImage.src = image.url;
  pictureImage.alt = image.description;
  pictureLikes.textContent = image.likes;
  pictureComments.textContent = image.comments;
  pictureFragment.appendChild(pictureTemplateClone);
});

picturesWrapper.appendChild(pictureFragment);
// console.log(getUsersPhotos);
