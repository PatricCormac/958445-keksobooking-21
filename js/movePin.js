'use strict';

(() => {
  const pin = document.querySelector(`.map__pin--main`);
  const inputAddress = document.querySelector(`#address`);
  const map = document.querySelector(`.map`);
  const PIN_WIDTH = pin.offsetWidth;
  const PIN_HEIGHT = pin.offsetHeight;
  const TOP_FIELD_BORDER = 130;
  const BOTTOM_FIELD_BORDER = 630;

  console.log(PIN_HEIGHT, PIN_WIDTH);

  pin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startLocation = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pin.offsetTop - shift.y - PIN_HEIGHT < TOP_FIELD_BORDER) {
        pin.style.top = TOP_FIELD_BORDER + PIN_HEIGHT + `px`;
      } else if (pin.offsetTop - shift.y + PIN_HEIGHT > BOTTOM_FIELD_BORDER) {
        pin.style.top = BOTTOM_FIELD_BORDER - PIN_HEIGHT + `px`;
      } else {
        pin.style.top = pin.offsetTop - shift.y + `px`;
      }

      if (pin.offsetLeft - shift.x < 0) {
        pin.style.right = PIN_WIDTH + `px`;
      } else if (pin.offsetLeft - shift.x + PIN_WIDTH > map.offsetWidth) {
        pin.style.left = map.offsetWidth - PIN_WIDTH + `px`;
      } else {
        pin.style.left = pin.offsetLeft - shift.x + `px`;
      }

      inputAddress.value = `${pin.offsetLeft - shift.x + PIN_WIDTH} ${pin.offsetTop - shift.y + PIN_HEIGHT}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          pin.removeEventListener(`click`, onClickPreventDefault);
        };
        pin.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });
})();
