export { createCard, deleteCard, activeLikeButton };
import { deleteCardApi, setLikeApi } from "./api";
// функция создания карточки
function createCard(
  element,
  cardId,
  deleteCard,
  likes,
  activeLikeButton,
  openPopupImage,
  ownerId,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likesCount = cardElement.querySelector(".card__like-count");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  likesCount.textContent = likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  // обработчик открытия модального окна с картинкой
  cardImage.addEventListener("click", () => {
    openPopupImage(element.link, element.name);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  // обработчик постановки лайка
  likeButton.addEventListener("click", () => {
    activeLikeButton(likeButton, cardId, likesCount);
  });

  const userHasliked = likes.some((like) => like._id === userId);
  if (userHasliked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (ownerId !== userId) {
    console.log("Это другое место");
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardId);
    });
  }

  return cardElement;
}

// функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
}
//функция постановки лайка
function activeLikeButton(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  setLikeApi(cardId, isLiked)
    .then((updateCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCount.textContent = updateCard.likes.length;
    })
    .catch((err) => console.log(err));
}
