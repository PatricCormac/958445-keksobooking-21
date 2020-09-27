'use strict';

const TYPES_HOUSES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const tempPin = document.querySelector(`#pin`).content;
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
  const x = randomInteger(null, 0, pinsList.offsetWidth) + 50;
  const y = randomInteger(null, 130, 630) + 70;
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
      FEATURES: getRandomLengthArr(FEATURES),
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

mapElement.classList.remove(`map--faded`);
