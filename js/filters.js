'use strict';

(() => {
  const MAX_COUNT_PINS = 5;
  const pinsList = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  const housingFeaturesInputs = housingFeatures.querySelectorAll(`input`);
  const fragment = document.createDocumentFragment();

  let filteredAds = [];
  let ads = [];

  const appEndAds = (arr) => {
    for (let i = 0; i < MAX_COUNT_PINS; i++) {
      if (!arr[i]) {
        return;
      }
      fragment.append(window.render.renderAds(arr[i]));
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

  const housingTypeFilter = () => {
    let arr = [];
    if (housingType.value === `any`) {
      arr = ads;
    } else {
      arr = ads.filter((item) => item.offer.type === housingType.value);
    }
    filteredAds = filteredAds.filter((item) => item.offer.type === housingType.value);
    filteredAds = arr.concat(filteredAds);
  };

  const housingPriceFilter = () => {
    let arr = [];
    switch (housingPrice.value) {
      case `low`:
        filteredAds = filteredAds.filter((item) => item.offer.price < 10000);
        arr = ads.filter((item) => item.offer.price < 10000);
        break;
      case `middle`:
        filteredAds = filteredAds.filter((item) => item.offer.price >= 10000 && item.offer.price < 50000);
        arr = ads.filter((item) => item.offer.price >= 10000 && item.offer.price < 50000);
        break;
      case `high`:
        filteredAds = filteredAds.filter((item) => item.offer.price >= 50000);
        arr = ads.filter((item) => item.offer.price >= 50000);
        break;
      case `any`:
        arr = ads;
        break;
    }
    filteredAds = arr.concat(filteredAds);
  };

  const housingRoomsFilter = () => {
    let arr = [];
    if (housingRooms.value === `any`) {
      arr = ads;
    } else {
      arr = ads.filter((item) => item.offer.rooms === parseInt(housingRooms.value, 10));
    }
    filteredAds = arr.concat(filteredAds);
  };

  const housingGuestsFilter = () => {
    let arr = [];
    if (housingGuests.value === `any`) {
      arr = ads;
    } else {
      arr = ads.filter((item) => item.offer.guests === parseInt(housingGuests.value, 10));
    }
    filteredAds = arr.concat(filteredAds);
  };

  const housingFeaturesFilter = () => {
    let arr = [];
    arr = ads.filter((item) => {
      for (let i = 0; i < housingFeatures.querySelectorAll(`input:checked`).length; i++) {
        return item.offer.features.includes(housingFeatures.querySelectorAll(`input:checked`)[i].value);
      }
      return 0;
    });
    filteredAds = arr.concat(filteredAds);
  };

  const sortAds = () => {
    for (let i = 0; i < filteredAds.length; i++) {
      let count = 0;
      for (let j = 0; j < filteredAds.length; j++) {
        if (filteredAds[i] === filteredAds[j]) {
          count += 1;
        }
      }
      filteredAds[i].count = count;
    }

    filteredAds.sort((left, right) => {
      if (left.count < right.count) {
        return 1;
      }
      if (left.count > right.count) {
        return -1;
      }
      if (left.count === right.count) {
        return 0;
      }
      return 0;
    });
    return filteredAds;
  };

  let lastTimeout;

  housingType.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      housingTypeFilter();
      updateAds(sortAds());
    }, 300);
  });

  housingPrice.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      housingPriceFilter();
      updateAds(sortAds());
    }, 300);
  });

  housingRooms.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      housingRoomsFilter();
      updateAds(sortAds());
    }, 300);
  });

  housingGuests.addEventListener(`change`, () => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      housingGuestsFilter();
      updateAds(sortAds());
    }, 300);
  });

  for (let i = 0; i < housingFeaturesInputs.length; i++) {
    housingFeaturesInputs[i].addEventListener(`change`, () => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        housingFeaturesFilter();
        updateAds(sortAds());
      }, 300);
    });
  }

  window.filters = {
    pins: fragment
  };
})();
