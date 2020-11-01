'use strict';

(() => {
  const tempCard = document.querySelector(`#card`).content;

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
      case `bungalow`:
        houseType = `Бунгало`;
        break;
    }
    return houseType;
  };

  window.renderCardAd = (ad) => {
    if (document.querySelector(`.map__card.popup`)) {
      window.utils.closeCard();
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

    window.utils.openCard(cardElement);
  };
})();
