'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const mapElement = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;
  const successTemp = document.querySelector(`#success`).content;
  const inputs = document.querySelectorAll(`input`);
  const adFormReset = document.querySelector(`.ad-form__reset`);
  const inputRooms = adForm.querySelector(`#room_number`);
  const inputGuests = adForm.querySelector(`#capacity`);
  const inputTimeIn = adForm.querySelector(`#timein`);
  const inputTimeOut = adForm.querySelector(`#timeout`);

  let mainPinLocationX = Math.round(parseInt(mainPin.style.left, 10) + parseInt(mainPinWidth, 10) / 2);
  let mainPinLocationY = Math.round(parseInt(mainPin.style.top, 10) + parseInt(mainPinHeight, 10) / 2);

  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = true;
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

  window.form.setPriceTypeHouse();

  document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;

  const onActivePage = () => {
    adFormReset.addEventListener(`mousedown`, window.pin.onDisablePage);
    document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;
    mapElement.classList.remove(`map--faded`);
    window.filters.appEndAds();
    pinsList.append(window.filters.pins);
    adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

  const pressEsc = (evt) => {
    if (evt.key === `Escape`) {
      closeSuccess();
    }
  };

  const closeSuccess = () => {
    if (document.querySelector(`.success`)) {
      document.querySelector(`.success`).remove();
      document.removeEventListener(`mousedown`, closeSuccess);
      document.removeEventListener(`keydown`, pressEsc);
    }
  };

  const onDisablePage = () => {
    const pinsElements = pinsList.querySelectorAll(`[type="button"]`);
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
    mapElement.classList.add(`map--faded`);
    if (document.querySelector(`.map__card.popup`)) {
      window.card.closeCard();
    }
    for (let i = 0; i < pinsElements.length; i++) {
      pinsList.removeChild(pinsElements[i]);
    }
    adForm.classList.add(`ad-form--disabled`);
    const successElement = successTemp.cloneNode(true);
    mapElement.append(successElement);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ``;
    }
    document.querySelector(`textarea`).value = ``;
    inputRooms.selectedIndex = 0;
    inputGuests.selectedIndex = 2;
    inputTimeIn.selectedIndex = 0;
    inputTimeOut.selectedIndex = 0;
    for (let i = 0; i < document.querySelectorAll(`[type="checkbox"]`).length; i++) {
      document.querySelectorAll(`[type="checkbox"]`)[i].checked = false;
    }
    document.querySelector(`[name="address"]`).value = `${mainPinLocationX} ${mainPinLocationY}`;
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    mainPin.style.left = `${mainPinLocationX - (mainPinWidth / 2)}px`;
    mainPin.style.top = `${mainPinLocationY - (mainPinHeight / 2)}px`;
    document.addEventListener(`mousedown`, closeSuccess);
    document.addEventListener(`keydown`, pressEsc);
  };

  window.pin = {
    onActivePage,
    onDisablePage
  };
})();
