'use strict';

(() => {
  const tempPin = document.querySelector(`#pin`).content;
  const mainPin = window.pinsList.querySelector(`.map__pin--main`);
  const MAIN_PIN_WIDTH = mainPin.offsetWidth;
  const MAIN_PIN_HEIGHT = mainPin.offsetHeight;

  let mainPinLocationX = Math.round(parseInt(mainPin.style.left, 10) + parseInt(MAIN_PIN_WIDTH, 10) / 2);
  let mainPinLocationY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(MAIN_PIN_HEIGHT, 10) / 2);

  const renderAds = (ad) => {
    const adElement = tempPin.cloneNode(true);
    adElement.querySelector(`.map__pin`).style =
      `left: ${ad.location.x}px; top: ${ad.location.y}px;`;
    adElement.querySelector(`img`).src = ad.author.avatar;
    adElement.querySelector(`img`).alt = ad.offer.title;
    return adElement;
  };

  const fragment = document.createDocumentFragment();

  window.ads.forEach((ad) => {
    fragment.appendChild(renderAds(ad));
  });

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

  const onActivePage = () => {
    window.mapElement.classList.remove(`map--faded`);
    window.pinsList.appendChild(fragment);
    window.adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < window.fieldsets.length; i++) {
      window.fieldsets[i].disabled = false;
    }
  };

  document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;
})();
