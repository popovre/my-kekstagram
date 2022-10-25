const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'text__container',
  errorTextParent: 'text__description',
  errorTextClass: 'text__description',
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log('можно отправлять');
  }
  else {
    console.log('нельзя отправять');
  }
});
