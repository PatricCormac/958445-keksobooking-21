'use strict';

document.addEventListener(`DOMContentLoaded`, () => {
  window.backend.load((ads) => {
    window.pin.appEndAds(ads);
  });
});
