'use strict';

(() => {
  window.adForm = document.querySelector(`.ad-form`);
  window.fieldsets = window.adForm.querySelectorAll(`fieldset`);
  const inputRooms = document.querySelector(`#room_number`);
  const inputGuests = document.querySelector(`#capacity`);

  for (let i = 0; i < window.fieldsets.length; i++) {
    window.fieldsets[i].disabled = true;
  }

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
