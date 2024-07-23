export { createCard, deleteCard, activeLikeButton };
// функция создания карточки
function createCard(element, deleteCard, openPopupImage, activeLikeButton) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement)); // обработчик удаления карточки
  // обработчик открытия модального окна с картинкой
  cardImage.addEventListener("click", () => {
    openPopupImage(element.link, element.name);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  // обработчик постановки лайка
  likeButton.addEventListener("click", () => {
    activeLikeButton(likeButton);
  });

  return cardElement;
}
// функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
//функция постановки лайка
function activeLikeButton(cardElement) {
  cardElement.classList.toggle("card__like-button_is-active");
}
