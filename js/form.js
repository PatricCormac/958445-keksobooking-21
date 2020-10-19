'use strict';

(() => {
  const inputRooms = document.querySelector(`#room_number`);
  const inputGuests = document.querySelector(`#capacity`);

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

  inputRooms.addEventListener(`input`, roomsGuestsValidity);
  inputGuests.addEventListener(`input`, roomsGuestsValidity);
})();
