export { openPopup, closePopup };

//функция открытия модального окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("click", closePopupByOverlay);
}
//функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEscape);
  popup.removeEventListener("click", closePopupByOverlay);
}
//функция закрытия модального окна при нажатии на Esc
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closePopup(popup);
    }
  }
}
//функция закрытия модального окна при нажатии на overlay
function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
