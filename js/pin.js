'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapElement = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const MAIN_PIN_WIDTH = mainPin.offsetWidth;
  const MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  const successTemp = document.querySelector(`#success`).content;
  const inputs = document.querySelectorAll(`input`);

  let mainPinLocationX = Math.round(parseInt(mainPin.style.left, 10) + parseInt(MAIN_PIN_WIDTH, 10) / 2);
  let mainPinLocationY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(MAIN_PIN_HEIGHT, 10) / 2);

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.pin.onActivePage();
    }
  });

  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      window.pin.onActivePage();
    }
  });

  window.pin = {
    onActivePage: () => {
      if (document.querySelector(`.success`)) {
        document.querySelector(`.success`).remove();
        document.removeEventListener(`mousedown`, window.pin.onActivePage);
      }
      mapElement.classList.remove(`map--faded`);
      pinsList.append(window.render.pins);
      adForm.classList.remove(`ad-form--disabled`);
      document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
    },
    onDisablePage: () => {
      const pinsElements = pinsList.querySelectorAll(`[type="button"]`);
      mapElement.classList.add(`map--faded`);
      for (let i = 0; i < pinsElements.length; i++) {
        pinsList.removeChild(pinsElements[i]);
      }
      adForm.classList.add(`ad-form--disabled`);
      const successElement = successTemp.cloneNode(true);
      mapElement.append(successElement);
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ``;
      }
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
      document.addEventListener(`mousedown`, window.pin.onActivePage);
      document.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Escape`) {
          window.pin.onActivePage();
        }
      });
    }
  };
})();
