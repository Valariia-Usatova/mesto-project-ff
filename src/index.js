import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, deleteCard, activeLikeButton } from "./components/card.js";

const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const openModalNewCard = document.querySelector(".popup_type_new-card");
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const popupInputTypeName = profileFormElement.querySelector(".popup__input_type_name");
const popupInputTypeDescription = profileFormElement.querySelector(".popup__input_type_description");
const addCardForm = document.querySelector('form[name="new-place"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

initialCards.forEach((element) => {
  const newCard = createCard(
    element,
    deleteCard,
    openPopupImage,
    activeLikeButton
  );
  addCard(newCard);
});
// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent; //заполняем инпут значениями из профиля
  popupInputTypeDescription.value = profileDescription.textContent; //заполняем инпут значениями из профиля
  openPopup(editProfilePopup); // открываем попап редактирования профиля
});
// обработчик открытия попапа добавления карточки
profileAddButton.addEventListener("click", function () {
  openPopup(openModalNewCard); // открываем попап добавления карточки
});
// обработчик закрытия попапа
popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    if (popup) {
      closePopup(popup); // закрываем попап в зависимости от кнопки
    }
  });
});
// обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = popupInputTypeName.value;
  const job = popupInputTypeDescription.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopup(editProfilePopup);
}
//функция открытия модального окна с картинкой
function openPopupImage(imageSrc, caption) {
  //функция открытия модального окна с картинкой в карточке
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupImage);
}
// обработчик отправки формы добавления карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const newCard = createCard(
    { name, link },
    deleteCard,
    openPopupImage,
    activeLikeButton
  );
  addCard(newCard, true);
  addCardForm.reset();
  closePopup(openModalNewCard);
}
// функция добавления карточки
function addCard(element, toStart) {
  if (toStart === true) {
    cardsContainer.prepend(element);
  } else {
    cardsContainer.append(element);
  }
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit); // обработчик отправки формы редактирования профиля
addCardForm.addEventListener("submit", addCardSubmit); // обработчик отправки формы добавления карточки
