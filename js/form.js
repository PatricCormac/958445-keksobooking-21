'use strict';

(() => {
  const form = document.querySelector(`.ad-form`);
  const inputRooms = form.querySelector(`#room_number`);
  const inputGuests = form.querySelector(`#capacity`);
  const inputPrice = form.querySelector(`#price`);
  const inputTypeHouse = form.querySelector(`#type`);
  const inputTimeIn = form.querySelector(`#timein`);
  const inputTimeOut = form.querySelector(`#timeout`);

  const inputGuestsHandler = () => {
    if (parseInt(inputRooms.value, 10) === 100 && parseInt(inputGuests.value, 10) !== 0) {
      inputGuests.setCustomValidity(`Не для гостей!`);
    } else if (parseInt(inputGuests.value, 10) > parseInt(inputRooms.value, 10)) {
      inputRooms.setCustomValidity(`Гости не поместятся!`);
      inputGuests.setCustomValidity(`Гости не поместятся!`);
    } else {
      inputGuests.setCustomValidity(``);
      inputRooms.setCustomValidity(``);
    }

    inputRooms.reportValidity();
    inputGuests.reportValidity();
  };

  const setPriceTypeHouse = () => {
    const typeHouseValue = inputTypeHouse.value;
    switch (typeHouseValue) {
      case `palace`:
        inputPrice.min = `10000`;
        inputPrice.placeholder = `10000`;
        break;
      case `flat`:
        inputPrice.min = `1000`;
        inputPrice.placeholder = `1000`;
        break;
      case `house`:
        inputPrice.min = `5000`;
        inputPrice.placeholder = `5000`;
        break;
      case `bungalow`:
        inputPrice.min = `0`;
        inputPrice.placeholder = `0`;
        break;
    }
  };

  const inputTypeHouseHandler = () => {
    setPriceTypeHouse();
  };

  inputTypeHouse.addEventListener(`input`, inputTypeHouseHandler);

  inputTimeIn.addEventListener(`input`, () => {
    inputTimeOut.selectedIndex = inputTimeIn.selectedIndex;
  });

  inputTimeOut.addEventListener(`input`, () => {
    inputTimeIn.selectedIndex = inputTimeOut.selectedIndex;
  });

  inputRooms.addEventListener(`input`, inputGuestsHandler);
  inputGuests.addEventListener(`input`, inputGuestsHandler);

  form.addEventListener(`submit`, (evt) => {
    window.backend.save(new FormData(form), () => {
      window.pin.onDisablePage();
    });
    evt.preventDefault();
  });

  window.form = {
    setPriceTypeHouse
  };
})();
