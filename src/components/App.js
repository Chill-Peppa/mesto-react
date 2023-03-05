import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
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

  //новый хук для стейта currentUser
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

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

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

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .sendUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
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
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

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
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm name="delete" title="Вы уверены?" btnText="Да" />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
