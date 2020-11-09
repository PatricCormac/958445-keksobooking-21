'use strict';

(() => {
  const tempPin = document.querySelector(`#pin`).content;

  window.render = {
    renderAds: (ad) => {
      const adElement = tempPin.cloneNode(true);
      adElement.querySelector(`.map__pin`).style =
        `left: ${ad.location.x}px; top: ${ad.location.y}px;`;
      adElement.querySelector(`img`).src = ad.author.avatar;
      adElement.querySelector(`img`).alt = ad.offer.title;
      adElement.querySelector(`.map__pin`).addEventListener(`preskey`, (evt) => {
        if (evt.key === `Enter`) {
          window.card.renderCardAd(ad);
        }
      });
      adElement.querySelector(`.map__pin`).addEventListener(`click`, () => {
        window.card.renderCardAd(ad);
      });
      return adElement;
    }
  };
})();
