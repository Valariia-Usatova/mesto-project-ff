import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, deleteCard, activeLikeButton } from "./components/card.js";

const cardsContainer = document.querySelector(".places__list");
const openModalEdit = document.querySelector(".popup_type_edit");
const closeModal = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const openModalNewCard = document.querySelector(".popup_type_new-card");
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector("input[name=name]");
const jobInput = document.querySelector("input[name=description]");
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
  nameInput.value = profileTitle.textContent; //заполняем инпут значениями из профиля
  jobInput.value = profileDescription.textContent; //заполняем инпут значениями из профиля
  openPopup(openModalEdit); // открываем попап редактирования профиля
});
// обработчик открытия попапа добавления карточки
profileAddButton.addEventListener("click", function () {
  openPopup(openModalNewCard); // открываем попап добавления карточки
});
// обработчик закрытия попапа
closeModal.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    if (popup) {
      closePopup(popup); // закрываем попап в зависимости от кнопки
    }
  });
});
// обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closePopup(openModalEdit);
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

formElement.addEventListener("submit", handleFormSubmit); // обработчик отправки формы редактирования профиля
addCardForm.addEventListener("submit", addCardSubmit); // обработчик отправки формы добавления карточки
