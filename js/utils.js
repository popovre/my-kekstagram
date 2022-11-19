const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};

String.prototype.delOneLast = function () {
  return this.slice(0, -1);
};

const getIntToFloat = (intNumber) => parseFloat(String(intNumber));

export {getIntToFloat};

const removeCoincidenceClass = (nodeElement, nodeElementArray, coincidenceArray, coincidenceClass) => {
  if (nodeElementArray.length > 0) {
    for (let i = 0; i < nodeElementArray.length; i++) {
      coincidenceClass = coincidenceArray.find((constantClass) => constantClass === nodeElementArray[i]);
      if (coincidenceClass !== undefined) {
        nodeElement.classList.remove(coincidenceClass);
        break;
      }
    }
  }
};

export {removeCoincidenceClass};
