'use strict';

window.utils = (() => {
  const mapElement = document.querySelector(`.map`);

  return {
    pressEscHandler: (evt) => {
      if (evt.key === `Escape`) {
        window.utils.closeCard();
      }
    },

    pressEnterHandler: (evt) => {
      if (evt.key === `Enter`) {
        window.utils.closeCard();
      }
    },

    openCard: (cardElement) => {
      mapElement.insertBefore(cardElement, mapElement.querySelector(`.map__filters-container`));
      const closeCardButton = document.querySelector(`.popup__close`);
      document.addEventListener(`keydown`, window.utils.pressEscHandler);
      closeCardButton.addEventListener(`click`, window.utils.closeCard);
      closeCardButton.addEventListener(`keydown`, window.utils.pressEnterHandler);
    },

    closeCard: () => {
      const closeCardButton = document.querySelector(`.popup__close`);
      document.removeEventListener(`keydown`, window.utils.pressEscHandler);
      closeCardButton.removeEventListener(`keydown`, window.utils.pressEnterHandler);
      closeCardButton.removeEventListener(`click`, window.utils.closeCard);
      document.querySelector(`.map__card.popup`).remove();
    },
  };
})();
