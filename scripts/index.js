// @todo: Темплейт карточки
//
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeList = document.querySelector(".places__list");

function addCard(element, deteleCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((element) => {
  placeList.append(addCard(element, deleteCard));
});
