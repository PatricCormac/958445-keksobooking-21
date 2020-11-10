'use strict';

(() => {
  const TOP_FIELD_BORDER = 130;
  const BOTTOM_FIELD_BORDER = 630;
  const pin = document.querySelector(`.map__pin--main`);
  const inputAddress = document.querySelector(`#address`);
  const map = document.querySelector(`.map`);
  const pinWidth = pin.offsetWidth;
  const pinHeight = pin.offsetHeight;

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

      if (pin.offsetTop - shift.y - pinHeight < TOP_FIELD_BORDER) {
        pin.style.top = TOP_FIELD_BORDER + pinHeight + `px`;
      } else if (pin.offsetTop - shift.y + pinHeight > BOTTOM_FIELD_BORDER) {
        pin.style.top = BOTTOM_FIELD_BORDER - pinHeight + `px`;
      } else {
        pin.style.top = pin.offsetTop - shift.y + `px`;
      }

      if (pin.offsetLeft - shift.x < 0) {
        pin.style.right = pinWidth + `px`;
      } else if (pin.offsetLeft - shift.x + pinWidth > map.offsetWidth) {
        pin.style.left = map.offsetWidth - pinWidth + `px`;
      } else {
        pin.style.left = pin.offsetLeft - shift.x + `px`;
      }

      inputAddress.value = `${pin.offsetLeft - shift.x + pinWidth} ${pin.offsetTop - shift.y + pinHeight}`;
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
