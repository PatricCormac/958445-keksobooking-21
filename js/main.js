'use strict';

const TYPES_HOUSES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const tempPin = document.querySelector(`#pin`).content;
const tempCard = document.querySelector(`#card`).content;
const mapElement = document.querySelector(`.map`);
const pinsList = mapElement.querySelector(`.map__pins`);

const getRandomLengthArr = (arr) => {
  const newArr = [];
  for (let i = 0; i < Math.ceil(Math.random() * arr.length); i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

const randomInteger = (length, min, max) => {
  if (min !== undefined && max !== undefined) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  return Math.floor(Math.random() * length);
};

const ads = [];

for (let i = 0; i < 8; i++) {
  const x = randomInteger(null, 0, pinsList.offsetWidth);
  const y = randomInteger(null, 130, 630);
  const locationX = x + 50 > pinsList.offsetWidth ? x - 50 : x;
  const locationY = y + 70 > pinsList.offsetHeight ? y - 70 : y;

  ads[i] = {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`
    },
    offer: {
      title: `Заголовок ${i + 1}`,
      address: `${locationX} ${locationY}`,
      price: randomInteger(1000),
      type: TYPES_HOUSES[randomInteger(TYPES_HOUSES.length)],
      rooms: Math.ceil(Math.random() * 6),
      guests: Math.ceil(Math.random() * 14),
      checkin: CHECKINS[randomInteger(CHECKINS.length)],
      checkout: CHECKOUTS[randomInteger(CHECKOUTS.length)],
      features: getRandomLengthArr(FEATURES),
      description: `Описание ${i + 1}`,
      photos: getRandomLengthArr(PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

const renderAds = (ad) => {
  const adElement = tempPin.cloneNode(true);
  adElement.querySelector(`.map__pin`).style =
  `left: ${ad.location.x}px; top: ${ad.location.y}px;`;
  adElement.querySelector(`img`).src = ad.author.avatar;
  adElement.querySelector(`img`).alt = ad.offer.title;
  return adElement;
};

const fragment = document.createDocumentFragment();

ads.forEach((ad)=>{
  fragment.appendChild(renderAds(ad));
});

pinsList.appendChild(fragment);

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
    .textContent = `` || ads[0].offer.title;
  cardElement.querySelector(`.popup__text--address`)
    .textContent = `` || ads[0].offer.address;
  cardElement.querySelector(`.popup__text--price`)
    .innerHTML = `` || `${ads[0].offer.price}&#8381;/ночь`;
  cardElement.querySelector(`.popup__type`)
    .textContent = `` || `${getHouseType(ads[0].offer.type)}`;
  cardElement.querySelector(`.popup__text--capacity`)
    .textContent = `` || `${ads[0].offer.rooms} комнаты для ${ads[0].offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`)
    .innerHTML = `` || `Заезд после ${ads[0].offer.checkin}, выезд&nbsp;до ${ads[0]
      .offer.checkin}`;
  cardElement.querySelector(`.popup__features`)
    .innerHTML = `` || `${ads[0].offer.features.join(`, `)}`;
  cardElement.querySelector(`.popup__description`)
    .innerHTML = `` || `${ads[0].offer.description}`;
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
