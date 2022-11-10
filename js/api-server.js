// let formData = new FormData();
const createLoader = (onSuccess,onError) => { fetch(
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
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });
};

createLoader(console.log, console.error);

const createUploader = (onSuccess, onError) => { fetch(
  'https://27.javascript.pages.academy/kekstagram-simple/data',
  {
    method: 'POST',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess('Результат', data);
  })
  .catch((err) => {
    onError(err);
  });
};
// createUploader(console.log, console.error);
// export {createLoader};
