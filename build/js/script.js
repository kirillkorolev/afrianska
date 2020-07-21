"use strict";

var popup = document.querySelector(".popup");
var openPopupButton = document.querySelector(".js-open-popup");
var closePopupButton = popup.querySelector(".js-close-popup");
var blackout = document.querySelector(".blackout");
var pageHeader = document.querySelector(".page-header");
var menuButton = pageHeader.querySelector(".js-menu-button");
var htmlGlobal = document.querySelector("html");
var bodyGlobal = document.querySelector("body");
var ESC_KEYCODE = 27;
var errors = {
  noname: "fill name",
  noemail: "fill email",
  nomessage: "fill meassage"
};
var popupForm = popup.querySelector(".popup__form");
var inputName = popupForm.querySelector("#popup-name");
var inputEmail = popupForm.querySelector("#popup-email");
var textarea = popupForm.querySelector(".popup__textarea");
var popupSubmitButton = popupForm.querySelector(".js-form-submit");

var resetErrorOnInput = function resetErrorOnInput(input, errorClass) {
  if (input.classList.contains(errorClass)) {
    input.classList.remove(errorClass);
  }
};

var resetPopupForm = function resetPopupForm() {
  inputName.value = "";
  inputEmail.value = "";
  textarea.value = "";
  resetErrorOnInput(inputName, "popup__input--error");
  resetErrorOnInput(inputEmail, "popup__input--error");
  resetErrorOnInput(textarea, "popup__textarea--error");
};

menuButton.addEventListener("click", function () {
  pageHeader.classList.toggle("page-header--menu-closed");
});

var showBlackout = function showBlackout() {
  if (blackout.classList.contains("blackout--hidden")) {
    blackout.classList.remove("blackout--hidden");
  }
};

var hideBlackout = function hideBlackout() {
  if (!blackout.classList.contains("blackout--hidden")) {
    blackout.classList.add("blackout--hidden");
  }
};

var blockBackground = function blockBackground() {
  htmlGlobal.style.paddingLeft = "17px";
  bodyGlobal.style.overflow = "hidden";
  bodyGlobal.style.touchAction = "none";
};

var unBlockBackground = function unBlockBackground() {
  htmlGlobal.style.paddingLeft = "";
  bodyGlobal.style.overflow = "";
  bodyGlobal.style.touchAction = "";
};

var closePopup = function closePopup(block, hiddenClass) {
  if (!block.classList.contains(hiddenClass)) {
    block.classList.add(hiddenClass);
  }

  hideBlackout();
  unBlockBackground();
  blackout.removeEventListener("click", function () {
    closePopup(popup, "popup--hidden");
  });
  resetPopupForm();
};

var onEscPress = function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(popup, "popup--hidden");
  }
};

var checkMenuClosed = function checkMenuClosed() {
  if (!pageHeader.classList.contains("page-header--menu-closed")) {
    pageHeader.classList.add("page-header--menu-closed");
  }
};

openPopupButton.addEventListener("click", function () {
  if (popup.classList.contains("popup--hidden")) {
    checkMenuClosed();
    popup.classList.remove("popup--hidden");
    document.addEventListener("keydown", onEscPress);
    showBlackout();
    blockBackground();
    blackout.addEventListener("click", function () {
      closePopup(popup, "popup--hidden");
    });
  }
});
closePopupButton.addEventListener("click", function () {
  closePopup(popup, "popup--hidden");
  document.removeEventListener("keydown", onEscPress);
});

var validateText = function validateText(input, errorType, errorClass) {
  var name = input.value;

  if (!name) {
    input.setCustomValidity(errorType);

    if (!input.classList.contains(errorClass)) {
      input.classList.add(errorClass);
    }

    input.classList.add("popup__input--bounce");
    setTimeout(function () {
      return resetErrorOnInput(input, "popup__input--bounce");
    }, 1500);
    return false;
  } else {
    input.setCustomValidity("");

    if (input.classList.contains(errorClass)) {
      input.classList.remove(errorClass);
    }

    return true;
  }
};

var validateEmail = function validateEmail(input, errorType, errorClass) {
  var mail = input.value;
  var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (regEx.test(mail) === false) {
    input.setCustomValidity(errorType);

    if (!input.classList.contains(errorClass)) {
      input.classList.add(errorClass);
    }

    input.classList.add("popup__input--bounce");
    setTimeout(function () {
      return resetErrorOnInput(input, "popup__input--bounce");
    }, 1500);
    return false;
  } else {
    input.setCustomValidity("");
    input.classList.remove(errorClass);
    return true;
  }
};

popupSubmitButton.addEventListener("click", function (evt) {
  if (validateText(inputName, errors.noname, "popup__input--error") && validateEmail(inputEmail, errors.noemail, "popup__input--error") && validateText(textarea, errors.nomessage, "popup__textarea--error")) {
    evt.preventDefault();
    closePopup(popup, "popup--hidden");
  }
});