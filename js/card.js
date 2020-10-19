'use strict';
/*
(() => {
  const tempCard = document.querySelector(`#card`).content;
  const mapElement = document.querySelector(`.map`);
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

window.renderCardAd = () => {
  const cardElement = tempCard.cloneNode(true);
  cardElement.querySelector(`.popup__title`)
    .textContent = window.data.ads[0].offer.title || ``;
  cardElement.querySelector(`.popup__text--address`)
    .textContent = window.data.ads[0].offer.address || ``;
  cardElement.querySelector(`.popup__text--price`)
    .innerHTML = `${window.data.ads[0].offer.price}&#8381;/ночь` || ``;
  cardElement.querySelector(`.popup__type`)
    .textContent = `${getHouseType(window.data.ads[0].offer.type)}` || ``;
  cardElement.querySelector(`.popup__text--capacity`)
    .textContent = `${window.data.ads[0].offer.rooms} комнаты для ${window.data.ads[0].offer.guests} гостей` || ``;
  cardElement.querySelector(`.popup__text--time`)
    .innerHTML = `Заезд после ${window.data.ads[0].offer.checkin}, выезд&nbsp;до ${window.data.ads[0]
      .offer.checkin}` || ``;
  cardElement.querySelector(`.popup__features`)
    .innerHTML = `${window.data.ads[0].offer.features.join(`, `)}` || ``;
  cardElement.querySelector(`.popup__description`)
    .innerHTML = `${window.data.ads[0].offer.description}` || ``;
  if (window.data.ads[0].offer.photos) {
    window.data.ads[0].offer.photos.forEach((photo)=> {
      const photoElement = cardElement.querySelector(`.popup__photo`).cloneNode();
      photoElement.src = photo;
      cardElement.querySelector(`.popup__photos`).appendChild(photoElement);
    });
  }
  cardElement.querySelector(`.popup__avatar`)
    .src = `${window.data.ads[0].author.avatar}`;

  mapElement.insertBefore(cardElement,
      mapElement.querySelector(`.map__filters-container`));
};

mapElement.classList.remove(`map--faded`);
})();
*/
