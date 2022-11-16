const getRequiredLength = (text,length) => {
  if (text.length <= length){
    return true;
  }
  return false;
};

const getRandomIntInclusive = (min, max) => {
  if(min < 0 || max < 0 || min === max){
    return NaN;
  }

  if(min > max){
    const reroll = min;
    min = max;
    max = reroll;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.random();
  return Math.floor(random * max - random * min + random) + min;
};

export {getRequiredLength,getRandomIntInclusive};

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
