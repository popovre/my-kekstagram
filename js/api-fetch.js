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

const sendImageData = (onSuccess, onError, body) => {
  fetch (
    OUTPUT_DATA_SOURCE,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        return onSuccess(true);
      }
      throw new Error();
    })
    .catch(() => {
      onError(false);
    });
};

export{sendImageData};
