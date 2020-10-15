'use strict';

document.addEventListener('DOMContentLoaded', () => {

  window.data.ads.forEach((ad) => {
    window.pin.fragment.appendChild(window.pin.renderAds(ad));
  });
})
