'use strict';

(() => {
  const inputRooms = document.querySelector(`#room_number`);
  const inputGuests = document.querySelector(`#capacity`);
  const inputTitle = document.querySelector(`#title`);
  const inputPrice = document.querySelector(`#price`);
  const inputTypeHouse = document.querySelector(`#type`);
  const inputTimeIn = document.querySelector(`#timein`);
  const inputTimeOut = document.querySelector(`#timeout`);
  let minPrice = 1000;

  const roomsGuestsValidity = () => {
    if (inputGuests.value > inputRooms.value) {
      inputRooms.setCustomValidity(`Гости не поместятся!`);
      inputGuests.setCustomValidity(`Гости не поместятся!`);
    } else {
      inputGuests.setCustomValidity(``);
      inputRooms.setCustomValidity(``);
    }

    inputRooms.reportValidity();
    inputGuests.reportValidity();
  };

  const inputValidity = () => {
    if (inputTitle.value.length < 30) {
      inputTitle.setCustomValidity(`Не менее 30 символов`);
    } else if (inputTitle.value.length > 100) {
      inputTitle.setCustomValidity(`Не более 100 символов`);
    } else {
      inputTitle.setCustomValidity(``);
    }

    inputTitle.reportValidity();
  };

  inputPrice.addEventListener(`input`, () => {
    if (inputPrice.value < minPrice) {
      inputPrice.setCustomValidity(`Значение не должно быть меньше ${minPrice}`);
    } else if (inputPrice.value > 1000000) {
      inputPrice.setCustomValidity(`Значение не должно превышать 1000000`);
    } else {
      inputPrice.setCustomValidity(``);
    }

    inputPrice.reportValidity();
  });

  inputTypeHouse.addEventListener(`input`, () => {
    const typeHouseValue = inputTypeHouse.value;
    switch (typeHouseValue) {
      case `palace`:
        minPrice = `10000`;
        break;
      case `flat`:
        minPrice = `1000`;
        break;
      case `house`:
        minPrice = `5000`;
        break;
      case `bungalow`:
        minPrice = `0`;
        break;
    }
  });

  inputTimeIn.addEventListener(`input`, () => {
    inputTimeOut.selectedIndex = inputTimeIn.selectedIndex;
  });

  inputTimeOut.addEventListener(`input`, () => {
    inputTimeIn.selectedIndex = inputTimeOut.selectedIndex;
  });

  inputTitle.addEventListener(`input`, inputValidity);
  inputRooms.addEventListener(`input`, roomsGuestsValidity);
  inputGuests.addEventListener(`input`, roomsGuestsValidity);
})();
