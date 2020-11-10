'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  const housingFeaturesInputs = housingFeatures.querySelectorAll(`input`);
  const fragment = document.createDocumentFragment();

  let maxCountPins = 5;
  let ads = [];

  const appEndAds = (arr = ads) => {
    for (let i = 0; i < maxCountPins; i++) {
      if (arr[i]) {
        fragment.append(window.render.renderAds(arr[i]));
      } else {
        return;
      }
    }
  };

  window.backend.load((data) => {
    ads = data;
    appEndAds(ads);
  });

  const updateAds = (arr) => {
    appEndAds(arr);
    pinsList.innerHTML = ``;
    pinsList.appendChild(mainPin);
    pinsList.appendChild(fragment);
  };

  const housingTypeFilter = (item) => {
    return housingType.value === `any` ? true : item.offer.type === housingType.value;
  };

  const housingPriceFilter = (item) => {
    switch (housingPrice.value) {
      case `low`:
        return item.offer.price <= 10000;
      case `middle`:
        return item.offer.price > 10000 && item.offer.price < 50000;
      case `high`:
        return item.offer.price >= 50000;
      case `any`:
        return true;
    }
    return 0;
  };

  const housingRoomsFilter = (item) => {
    if (housingRooms.value === `any`) {
      return true;
    } else {
      return item.offer.rooms === parseInt(housingRooms.value, 10);
    }
  };

  const housingGuestsFilter = (item) => {
    if (housingGuests.value === `any`) {
      return true;
    } else {
      return item.offer.guests === parseInt(housingGuests.value, 10);
    }
  };

  const housingFeaturesFilter = (item) => {
    return Array.from(housingFeatures.querySelectorAll(`input:checked`)).every((el) => {
      return item.offer.features.includes(el.value);
    });
  };

  const onFilter = () => {
    let filteredAds = ads;
    if (document.querySelector(`.map__card.popup`)) {
      window.card.closeCard();
    }
    filteredAds = filteredAds
      .filter(housingTypeFilter)
      .filter(housingPriceFilter)
      .filter(housingRoomsFilter)
      .filter(housingGuestsFilter)
      .filter(housingFeaturesFilter);
    return filteredAds;
  };

  let lastTimeout;

  housingType.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      updateAds(onFilter());
    }, 300);
  });

  housingPrice.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      updateAds(onFilter());
    }, 300);
  });

  housingRooms.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      updateAds(onFilter());
    }, 300);
  });

  housingGuests.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      updateAds(onFilter());
    }, 300);
  });

  for (let i = 0; i < housingFeaturesInputs.length; i++) {
    housingFeaturesInputs[i].addEventListener(`change`, () => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        updateAds(onFilter());
      }, 300);
    });
  }

  window.filters = {
    appEndAds,
    pins: fragment
  };
})();
