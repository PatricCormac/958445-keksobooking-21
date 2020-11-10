'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const statusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const errorTemp = document.querySelector(`#error`).content;

  const hideError = () => {
    document.querySelector(`main`).removeChild(document.querySelector(`.error`));
  };

  const showError = () => {
    const errorElement = errorTemp.cloneNode(true);
    document.querySelector(`main`).append(errorElement);
    document.addEventListener(`click`, hideError);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        hideError();
      }
    });
  };

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(showError());
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(showError());
    });

    xhr.addEventListener(`timeout`, () => {
      onError(showError());
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, `${URL}/data`);
    xhr.send();
  };

  const save = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(showError());
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(showError());
    });

    xhr.addEventListener(`timeout`, () => {
      onError(showError());
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, `${URL}`);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };
})();
