'use strict';

(() => {
  const MAX_COUNT_PINS = 5;
  const houseTypeElement = document.querySelector(`#type`);
  const tempPin = document.querySelector(`#pin`).content;
  const pinsList = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  let houseType;
  let ads = [];
  const fragment = document.createDocumentFragment();

  const renderAds = (ad) => {
    const adElement = tempPin.cloneNode(true);
    adElement.querySelector(`.map__pin`).style =
      `left: ${ad.location.x}px; top: ${ad.location.y}px;`;
    adElement.querySelector(`img`).src = ad.author.avatar;
    adElement.querySelector(`img`).alt = ad.offer.title;
    adElement.querySelector(`.map__pin`).addEventListener(`preskey`, (evt) => {
      if (evt.key === `Enter`) {
        window.renderCardAd(ad);
      }
    });
    adElement.querySelector(`.map__pin`).addEventListener(`click`, () => {
      window.renderCardAd(ad);
    });
    return adElement;
  };

  const appEndAds = (arr) => {
    for (let i = 0; i < arr.length && i < MAX_COUNT_PINS; i++) {
      fragment.append(renderAds(arr[i]));
    }
  };

  window.backend.load((data) => {
    ads = data;
    appEndAds(ads);
  });

  const updateAds = (filteredAds) => {
    appEndAds(filteredAds);
    pinsList.innerHTML = ``;
    pinsList.appendChild(mainPin);
    pinsList.appendChild(fragment);
  };

  houseTypeElement.addEventListener(`change`, () => {
    houseType = houseTypeElement.value;
    let filteredAds = ads.filter((ad) => {
      return ad.offer.type === houseType;
    });
    updateAds(filteredAds);
  });

  window.render = {
    pins: fragment
  };
})();
