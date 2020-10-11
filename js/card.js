'use strict';

/*
(() => {
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

const renderCardAd = () => {
  const cardElement = tempCard.cloneNode(true);
  cardElement.querySelector(`.popup__title`)
    .textContent = ads[0].offer.title || ``;
  cardElement.querySelector(`.popup__text--address`)
    .textContent = ads[0].offer.address || ``;
  cardElement.querySelector(`.popup__text--price`)
    .innerHTML = `${ads[0].offer.price}&#8381;/ночь` || ``;
  cardElement.querySelector(`.popup__type`)
    .textContent = `${getHouseType(ads[0].offer.type)}` || ``;
  cardElement.querySelector(`.popup__text--capacity`)
    .textContent = `${ads[0].offer.rooms} комнаты для ${ads[0].offer.guests} гостей` || ``;
  cardElement.querySelector(`.popup__text--time`)
    .innerHTML = `Заезд после ${ads[0].offer.checkin}, выезд&nbsp;до ${ads[0]
      .offer.checkin}` || ``;
  cardElement.querySelector(`.popup__features`)
    .innerHTML = `${ads[0].offer.features.join(`, `)}` || ``;
  cardElement.querySelector(`.popup__description`)
    .innerHTML = `${ads[0].offer.description}` || ``;
  if (ads[0].offer.photos) {
    ads[0].offer.photos.forEach((photo)=> {
      const photoElement = cardElement.querySelector(`.popup__photo`).cloneNode();
      photoElement.src = photo;
      cardElement.querySelector(`.popup__photos`).appendChild(photoElement);
    });
  }
  cardElement.querySelector(`.popup__avatar`)
    .src = `${ads[0].author.avatar}`;

  mapElement.insertBefore(cardElement,
      mapElement.querySelector(`.map__filters-container`));
};

renderCardAd();

mapElement.classList.remove(`map--faded`);
})();
*/
