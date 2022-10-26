const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'text__container',
  errorTextParent: 'text__container',
  errorTextClass: 'text__description-error',
});
