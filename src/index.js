import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, deleteCard, activeLikeButton } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserDataApi,
  getInitialCardsApi,
  editUserDataApi,
  addNewCardApi,
  editAvatarApi,
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const openModalNewCard = document.querySelector(".popup_type_new-card");
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const popupInputTypeName = profileFormElement.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = profileFormElement.querySelector(
  ".popup__input_type_description"
);
const addCardForm = document.querySelector('form[name="new-place"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editAvatarForm = document.querySelector('form[name="edit-avatar"]');
const avatarLinkInput = editAvatarForm.querySelector(
  ".popup__input_type_avatar"
);
const profileAvatar = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent; //заполняем инпут значениями из профиля
  popupInputTypeDescription.value = profileDescription.textContent; //заполняем инпут значениями из профиля
  clearValidation(profileFormElement, validationConfig); // очищаем валидацию
  openPopup(editProfilePopup); // открываем попап редактирования профиля
});
// обработчик открытия попапа добавления карточки
profileAddButton.addEventListener("click", function () {
  addCardForm.reset(); // очищаем форму
  clearValidation(addCardForm, validationConfig); // очищаем валидацию
  openPopup(openModalNewCard); // открываем попап добавления карточки
});
// обработчик открытия попапа редактирования аватара
profileAvatar.addEventListener("click", () => {
  editAvatarForm.reset(); // очищаем форму
  clearValidation(editAvatarForm, validationConfig); // очищаем валидацию
  openPopup(editAvatarPopup);
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
  renderLoading(true, profileFormElement); //уведомление пользователя о результатах загрузки

  const name = popupInputTypeName.value;
  const job = popupInputTypeDescription.value;

  editUserDataApi(name, job)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, profileFormElement);
    });
}
//функция открытия модального окна с картинкой
function openPopupImage(imageSrc, caption) {
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = caption;
  popupCaption.textContent = caption;
  openPopup(popupImage);
}
// обработчик отправки формы добавления карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addCardForm);

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addNewCardApi(name, link)
    .then((card) => {
      const newCard = createCard(
        { name, link },
        card._id,
        deleteCard,
        card.likes,
        activeLikeButton,
        openPopupImage,
        card.owner._id
      );

      addCard(newCard, true);
      addCardForm.reset();
      closePopup(openModalNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, addCardForm);
    });
}
// функция редактирования аватара
function editAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, editAvatarForm);
  const avatarLink = avatarLinkInput.value;
  editAvatarApi(avatarLink)
    .then((avatar) => {
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`;
      editAvatarForm.reset();
      closePopup(editAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, editAvatarForm);
    });
}
// функция добавления карточки в начало листа
function addCard(element, toStart) {
  if (toStart === true) {
    cardsContainer.prepend(element);
  } else {
    cardsContainer.append(element);
  }
}
// функция получения данных пользователя и карточек
Promise.all([getUserDataApi(), getInitialCardsApi()])
  .then(([userData, initialCards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((card) => {
      const newCard = createCard(
        card,
        card._id,
        deleteCard,
        card.likes,
        activeLikeButton,
        openPopupImage,
        card.owner._id,
        userData._id
      );
      addCard(newCard);
    });
  })
  .catch((err) => console.log(err));
//уведомление пользователя о результатах загрузки
const renderLoading = (isLoading, formElement) => {
  const buttonElement = formElement.querySelector(".popup__button");
  if (isLoading) {
    buttonElement.setAttribute("data-text", buttonElement.textContent);
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = buttonElement.getAttribute("data-text");
    buttonElement.removeAttribute("data-text");
  }
};

profileFormElement.addEventListener("submit", handleProfileFormSubmit); // обработчик отправки формы редактирования профиля
addCardForm.addEventListener("submit", addCardSubmit); // обработчик отправки формы добавления карточки
editAvatarForm.addEventListener("submit", editAvatarSubmit); // обработчик отправки формы редактирования аватара
enableValidation(validationConfig); // включаем валидацию
