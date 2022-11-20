const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};

const removeCoincidenceClass = (nodeElement, nodeElementArray, coincidenceArray, coincidenceClass) => {
  for (let i = 0; i < nodeElementArray.length; i++) {
    coincidenceClass = coincidenceArray.find((constantClass) => constantClass === nodeElementArray[i]);
    if (coincidenceClass !== undefined) {
      nodeElement.classList.remove(coincidenceClass);
      break;
    }
  }
};

export {removeCoincidenceClass};
