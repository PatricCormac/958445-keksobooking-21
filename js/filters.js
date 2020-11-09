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

  const appEndAds = (arr) => {
    for (let i = 0; i < maxCountPins; i++) {
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

    return arr;
  };

  const housingPriceFilter = () => {
    let arr = [];
    switch (housingPrice.value) {
      case `low`:
        arr = ads.filter((item) => item.offer.price < 10000);
        break;
      case `middle`:
        arr = ads.filter((item) => item.offer.price >= 10000 && item.offer.price < 50000);
        break;
      case `high`:
        arr = ads.filter((item) => item.offer.price >= 50000);
        break;
      case `any`:
        arr = ads;
        break;
    }

    return arr;
  };

  const housingRoomsFilter = () => {
    let arr = [];
    if (housingRooms.value === `any`) {
      arr = ads;
    } else {
      arr = ads.filter((item) => item.offer.rooms === parseInt(housingRooms.value, 10));
    }

    return arr;
  };

  const housingGuestsFilter = () => {
    let arr = [];
    if (housingGuests.value === `any`) {
      arr = ads;
    } else {
      arr = ads.filter((item) => item.offer.guests === parseInt(housingGuests.value, 10));
    }
    return arr;
  };

  const housingFeaturesFilter = () => {
    let arr = [];
    arr = ads.filter((item) => {
      for (let i = 0; i < housingFeatures.querySelectorAll(`input:checked`).length; i++) {
        return item.offer.features.includes(housingFeatures.querySelectorAll(`input:checked`)[i].value);
      }
      return 0;
    });
    return arr;
  };

  const onFilter = () => {
    let filteredAds = [];
    return filteredAds.concat(housingTypeFilter()).concat(housingPriceFilter()).concat(housingRoomsFilter()).concat(housingGuestsFilter()).concat(housingFeaturesFilter());
  };

  const sortAds = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let count = 0;
      for (let j = 0; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          count += 1;
        }
      }
      arr[i].count = count;
    }

    arr.sort((left, right) => {
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
    return arr;
  };

  housingType.addEventListener(`change`, () => {
    maxCountPins = housingTypeFilter().length;
    updateAds(sortAds(onFilter()));
  });

  housingPrice.addEventListener(`change`, () => {
    maxCountPins = housingPriceFilter().length;
    updateAds(sortAds(onFilter()));
  });

  housingRooms.addEventListener(`change`, () => {
    maxCountPins = housingRoomsFilter().length;
    updateAds(sortAds(onFilter()));
  });

  housingGuests.addEventListener(`change`, () => {
    maxCountPins = housingGuestsFilter().length;
    updateAds(sortAds(onFilter()));
  });

  for (let i = 0; i < housingFeaturesInputs.length; i++) {
    housingFeaturesInputs[i].addEventListener(`change`, () => {
      maxCountPins =
      updateAds(sortAds(onFilter()));
    });
  }

  window.filters = {
    pins: fragment
  };
})();
