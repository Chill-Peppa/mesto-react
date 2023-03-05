import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  //хук чтобы открыть сам попап
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  //хук для конкретной карточки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  //новый хук для стейта currentUser + старый хук для карточек из мейн
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [cards, setCards] = React.useState([]);

  //новый хук для эффекта при монтировании
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userArr, initialCards]) => {
        setCurrentUser(userArr);
        setCards(initialCards);
        console.log(userArr);
        console.log(initialCards);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  };

  //добавим новые функции пр.11
  //проверка лайка + запрос
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  //поддержка удаления карточки
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? "" : c))
        ).then(() => closeAllPopups());
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <PopupWithForm
            title="Редактировать профиль"
            name="edit-button"
            btnText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              id="firstname-input"
              type="text"
              name="name"
              placeholder="Имя пользователя"
              className="form__item form__item_info_name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="firstname-input-error form__item-error"></span>
            <input
              id="career-input"
              type="text"
              name="about"
              placeholder="Род деятельности"
              className="form__item form__item_info_job"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="career-input-error form__item-error"></span>
          </PopupWithForm>

          <PopupWithForm
            name="add-photo"
            title="Новое место"
            btnText="Создать"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              id="title-input"
              type="text"
              name="name"
              placeholder="Название"
              className="form__item form__item_info_title"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="title-input-error form__item-error"></span>
            <input
              id="link-input"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              className="form__item form__item_info_link"
              required
            />
            <span className="link-input-error form__item-error"></span>
          </PopupWithForm>

          <ImagePopup
            isOpen={isCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            btnText="Создать"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
            <input
              id="avatar-input"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              className="form__item form__item_avatar_link"
              required
            />
            <span className="avatar-input-error form__item-error"></span>
          </PopupWithForm>

          <PopupWithForm name="delete" title="Вы уверены?" btnText="Да" />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
