export {
  getUserDataApi,
  getInitialCardsApi,
  editUserDataApi,
  addNewCardApi,
  setLikeApi,
  deleteCardApi,
  editAvatarApi,
};

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-20/",
  headers: {
    "Content-Type": "application/json",
    authorization: "637e00e2-8971-4883-9192-484a85c9cf6f",
  },
};

const getResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
// апи получения данных пользователя
const getUserDataApi = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
  }).then(getResponce);
};
// апи получения карточек
const getInitialCardsApi = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
  }).then(getResponce);
};
// апи изменения данных пользователя
const editUserDataApi = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getResponce);
};
// апи добавления новой карточки
const addNewCardApi = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getResponce);
};
// апи лайков
const setLikeApi = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(getResponce);
};
// апи удаления карточки
const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(getResponce);
};
// апи редактирования аватара
const editAvatarApi = (avatar) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(getResponce);
};
