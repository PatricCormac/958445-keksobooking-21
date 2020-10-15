'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const tempPin = document.querySelector(`#pin`).content;
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapElement = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const MAIN_PIN_WIDTH = mainPin.offsetWidth;
  const MAIN_PIN_HEIGHT = mainPin.offsetHeight;

  let mainPinLocationX = Math.round(parseInt(mainPin.style.left, 10) + parseInt(MAIN_PIN_WIDTH, 10) / 2);
  let mainPinLocationY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(MAIN_PIN_HEIGHT, 10) / 2);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  const onActivePage = () => {
    mapElement.classList.remove(`map--faded`);
    pinsList.appendChild(fragment);
    adForm.classList.remove(`ad-form--disabled`);
    document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  mainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      onActivePage();
    }
  });

  mainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      onActivePage();
    }
  });

  window.pin = {
    fragment,
    renderAds: (ad) => {
      const adElement = tempPin.cloneNode(true);
      adElement.querySelector(`.map__pin`).style =
        `left: ${ad.location.x}px; top: ${ad.location.y}px;`;
      adElement.querySelector(`img`).src = ad.author.avatar;
      adElement.querySelector(`img`).alt = ad.offer.title;
      return adElement;
    }
  }
})();
