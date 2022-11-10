const picturesWrapper = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getUsersGallery = (galleryValues) => {
  const pictureFragment = document.createDocumentFragment();

  galleryValues.forEach((image) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImage = picture.querySelector('.picture__img');
    const pictureLikes = picture.querySelector('.picture__likes');
    const pictureComments = picture.querySelector('.picture__comments');

    pictureImage.src = image.url;
    pictureImage.alt = image.description;
    pictureLikes.textContent = image.likes;
    pictureComments.textContent = image.comments;
    pictureFragment.appendChild(picture);
  });

  picturesWrapper.appendChild(pictureFragment);
};

export {getUsersGallery};
