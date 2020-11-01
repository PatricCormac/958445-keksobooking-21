'use strict';

(() => {
  const inputRooms = document.querySelector(`#room_number`);
  const inputGuests = document.querySelector(`#capacity`);
  const inputPrice = document.querySelector(`#price`);
  const inputTypeHouse = document.querySelector(`#type`);
  const inputTimeIn = document.querySelector(`#timein`);
  const inputTimeOut = document.querySelector(`#timeout`);

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

  inputTypeHouse.addEventListener(`input`, () => {
    const typeHouseValue = inputTypeHouse.value;
    switch (typeHouseValue) {
      case `palace`:
        inputPrice.min = `10000`;
        break;
      case `flat`:
        inputPrice.min = `1000`;
        break;
      case `house`:
        inputPrice.min = `5000`;
        break;
      case `bungalo`:
        inputPrice.min = `0`;
        break;
    }
  });

  inputTimeIn.addEventListener(`input`, () => {
    inputTimeOut.selectedIndex = inputTimeIn.selectedIndex;
  });

  inputTimeOut.addEventListener(`input`, () => {
    inputTimeIn.selectedIndex = inputTimeOut.selectedIndex;
  });

  inputRooms.addEventListener(`input`, roomsGuestsValidity);
  inputGuests.addEventListener(`input`, roomsGuestsValidity);
})();
