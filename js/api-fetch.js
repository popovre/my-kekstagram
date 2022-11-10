import {isEscapeKey} from './utils.js';

const createLoader = (onError, dataHandler) => { fetch(
  'https://27.javascript.pages.academy/kekstagram-simple/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error;
  })
  .then((data) => {
    dataHandler(data);
  })
  .catch(() => {
    onError('галерея недоступна, обновите страницу...');
  });
};

export {createLoader};

const onModalEcsKeydown = (evt, child) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.body.removeChild(child);
  }
};

const createUploader = (closeModal, successTemplate, errorTemplate, body) => { fetch(
  'https://27.javascript.pages.academy/kekstagram-simple',
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

export {createUploader};
