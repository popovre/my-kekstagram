import {isEscapeKey} from './utils.js';
const INPUT_DATA_SOURCE = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const OUTPUT_DATA_SOURCE = 'https://27.javascript.pages.academy/kekstagram-simple';

const getImageData = (onSuccess, onError) => {
  fetch (INPUT_DATA_SOURCE)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};

export {getImageData};

// const onModalEcsKeydown = (evt, child) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     document.body.removeChild(child);
//   }
// };

const sendImageData = (onSuccess, onError, body) => {
  fetch(
    OUTPUT_DATA_SOURCE,
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        closeModal();
        const successFragment = document.createDocumentFragment();
        const success = successTemplate.cloneNode(true);
        successFragment.appendChild(success);
        document.body.appendChild(successFragment);
      }
      else {
        closeModal();
        const errorFragment = document.createDocumentFragment();
        const error = errorTemplate.cloneNode(true);
        errorFragment.appendChild(error);
        document.body.appendChild(errorFragment);
      }
    })
    .catch(() => {
      closeModal();
      const errorFragment = document.createDocumentFragment();
      const error = errorTemplate.cloneNode(true);
      errorFragment.appendChild(error);
      document.body.appendChild(errorFragment);
    });
};

export{sendImageData};
