import {GALLERY_LENGTH,DESCRIPTIONS} from './constants.js';
import {getRandomIntInclusive} from './utils.js';

const getPhotoDescription = function(index){
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomIntInclusive(15,200),
    comments: getRandomIntInclusive(0,200)
  };
};

const galleryPhotos = Array.from({ length:GALLERY_LENGTH }, (_value, ind) => getPhotoDescription(ind));

export {galleryPhotos};
