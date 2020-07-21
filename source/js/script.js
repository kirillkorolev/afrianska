const popup = document.querySelector(`.popup`);
const openPopupButton = document.querySelector(`.js-open-popup`);
const closePopupButton = popup.querySelector(`.js-close-popup`);
const blackout = document.querySelector(`.blackout`);
const pageHeader = document.querySelector(`.page-header`);
const menuButton = pageHeader.querySelector(`.js-menu-button`);

const htmlGlobal = document.querySelector(`html`);
const bodyGlobal = document.querySelector(`body`);

const ESC_KEYCODE = 27;

const errors = {
  noname: `fill name`,
  noemail: `fill email`,
  nomessage: `fill meassage`
};

const popupForm = popup.querySelector(`.popup__form`);

const inputName = popupForm.querySelector(`#popup-name`);
const inputEmail = popupForm.querySelector(`#popup-email`);
const textarea = popupForm.querySelector(`.popup__textarea`);

const popupSubmitButton = popupForm.querySelector(`.js-form-submit`);

const resetErrorOnInput = (input, errorClass) => {
  if (input.classList.contains(errorClass)) {
    input.classList.remove(errorClass);
  }
};

const resetPopupForm = () => {
  inputName.value = ``;
  inputEmail.value = ``;
  textarea.value = ``;

  resetErrorOnInput(inputName, `popup__input--error`);
  resetErrorOnInput(inputEmail, `popup__input--error`);
  resetErrorOnInput(textarea, `popup__textarea--error`);
};

menuButton.addEventListener(`click`, () => {
  pageHeader.classList.toggle(`page-header--menu-closed`);
});

const showBlackout = () => {
  if (blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.remove(`blackout--hidden`);
  }
};

const hideBlackout = () => {
  if (!blackout.classList.contains(`blackout--hidden`)) {
    blackout.classList.add(`blackout--hidden`);
  }
};

const blockBackground = () => {
  htmlGlobal.style.paddingLeft = `17px`;
  bodyGlobal.style.overflow = `hidden`;
  bodyGlobal.style.touchAction = `none`;
};

const unBlockBackground = () => {
  htmlGlobal.style.paddingLeft = ``;
  bodyGlobal.style.overflow = ``;
  bodyGlobal.style.touchAction = ``;
};

const closePopup = (block, hiddenClass) => {
  if (!block.classList.contains(hiddenClass)) {
    block.classList.add(hiddenClass);
  }

  hideBlackout();
  unBlockBackground();
  blackout.removeEventListener(`click`, () => {
    closePopup(popup, `popup--hidden`);
  });

  resetPopupForm();
};

const onEscPress = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(popup, `popup--hidden`);
  }
};

const checkMenuClosed = () => {
  if (!pageHeader.classList.contains(`page-header--menu-closed`)) {
    pageHeader.classList.add(`page-header--menu-closed`);
  }
};

openPopupButton.addEventListener(`click`, () => {
  if (popup.classList.contains(`popup--hidden`)) {
    checkMenuClosed();

    popup.classList.remove(`popup--hidden`);

    document.addEventListener(`keydown`, onEscPress);
    showBlackout();
    blockBackground();
    blackout.addEventListener(`click`, () => {
      closePopup(popup, `popup--hidden`);
    });
  }
});

closePopupButton.addEventListener(`click`, () => {
  closePopup(popup, `popup--hidden`);
  document.removeEventListener(`keydown`, onEscPress);
});

const validateText = (input, errorType, errorClass) => {
  const name = input.value;

  if (!name) {
    input.setCustomValidity(errorType);

    if (!input.classList.contains(errorClass)) {
      input.classList.add(errorClass);
    }

    input.classList.add(`popup__input--bounce`);
    setTimeout(() => resetErrorOnInput(input, `popup__input--bounce`), 1500);

    return false;
  } else {
    input.setCustomValidity(``);
    if (input.classList.contains(errorClass)) {
      input.classList.remove(errorClass);
    }
    return true;
  }

};

const validateEmail = (input, errorType, errorClass) => {
  const mail = input.value;
  const regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regEx.test(mail) === false) {
    input.setCustomValidity(errorType);

    if (!input.classList.contains(errorClass)) {
      input.classList.add(errorClass);
    }

    input.classList.add(`popup__input--bounce`);
    setTimeout(() => resetErrorOnInput(input, `popup__input--bounce`), 1500);

    return false;
  } else {
    input.setCustomValidity(``);
    input.classList.remove(errorClass);
    return true;
  }
};

popupSubmitButton.addEventListener(`click`, (evt) => {
  if (validateText(inputName, errors.noname, `popup__input--error`) && validateEmail(inputEmail, errors.noemail, `popup__input--error`) && validateText(textarea, errors.nomessage, `popup__textarea--error`)) {
    evt.preventDefault();
    closePopup(popup, `popup--hidden`);
  }
});
