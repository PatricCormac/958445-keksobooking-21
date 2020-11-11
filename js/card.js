'use strict';

(() => {
  const tempCard = document.querySelector(`#card`).content;
  const mapElement = document.querySelector(`.map`);

  const pressEscHandler = (evt) => {
    if (evt.key === `Escape`) {
      window.card.closeCard();
    }
  };

  const pressEnterHandler = (evt) => {
    if (evt.key === `Enter`) {
      window.card.closeCard();
    }
  };

  const onCloseCardButtonClick = () => {
    window.card.closeCard();
  };

  const openCard = (cardElement) => {
    mapElement.insertBefore(cardElement, mapElement.querySelector(`.map__filters-container`));
    const closeCardButton = document.querySelector(`.popup__close`);
    document.addEventListener(`keydown`, pressEscHandler);
    closeCardButton.addEventListener(`click`, onCloseCardButtonClick);
    closeCardButton.addEventListener(`keydown`, pressEnterHandler);
  };

  const getHouseType = (type) => {
    let houseType = ``;
    switch (type) {
      case `palace`:
        houseType = `Дворец`;
        break;
      case `flat`:
        houseType = `Квартира`;
        break;
      case `house`:
        houseType = `Дом`;
        break;
      case `bungalo`:
        houseType = `Бунгало`;
        break;
    }
    return houseType;
  };

  const closeCard = () => {
    const closeCardButton = document.querySelector(`.popup__close`);
    document.removeEventListener(`keydown`, pressEscHandler);
    closeCardButton.removeEventListener(`keydown`, pressEnterHandler);
    closeCardButton.removeEventListener(`click`, onCloseCardButtonClick);
    document.querySelector(`.map__card.popup`).remove();
  };

  const renderCardAd = (ad) => {
    if (document.querySelector(`.map__card.popup`)) {
      window.card.closeCard();
    }

    const cardElement = tempCard.cloneNode(true);

    cardElement.querySelector(`.popup__title`).textContent = ad.offer.title || ``;

    cardElement.querySelector(`.popup__text--address`).textContent = ad.offer.address || ``;

    cardElement.querySelector(`.popup__text--price`).innerHTML = `${ad.offer.price}&#8381;/ночь` || ``;

    cardElement.querySelector(`.popup__type`).textContent = `${getHouseType(ad.offer.type)}` || ``;

    cardElement.querySelector(`.popup__text--capacity`)
      .textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей` || ``;

    cardElement.querySelector(`.popup__text--time`)
      .innerHTML = `Заезд после ${ad.offer.checkin}, выезд&nbsp;до ${ad.offer.checkin}` || ``;

    cardElement.querySelector(`.popup__features`).innerHTML = `${ad.offer.features.join(`, `)}` || ``;

    cardElement.querySelector(`.popup__description`).innerHTML = `${ad.offer.description}` || ``;

    if (ad.offer.photos) {
      const photosFragment = document.createDocumentFragment();
      for (let i = 0; i < ad.offer.photos.length; i++) {
        const photoElement = cardElement.querySelector(`.popup__photo`).cloneNode();
        photoElement.src = ad.offer.photos[i];
        photosFragment.appendChild(photoElement);
      }
      cardElement.querySelector(`.popup__photos`).innerHTML = ``;
      cardElement.querySelector(`.popup__photos`).appendChild(photosFragment);
    }

    cardElement.querySelector(`.popup__avatar`).src = `${ad.author.avatar}`;

    openCard(cardElement);
  };

  window.card = {
    closeCard,
    renderCardAd
  };
})();
