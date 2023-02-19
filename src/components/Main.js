import React from "react";
import { api } from "../utils/api";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userArr, initialCards]) => {
        setUserName(userArr.name);
        setUserDescription(userArr.about);
        setUserAvatar(userArr.avatar);
        setCards(initialCards);
        console.log(initialCards);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__area">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="Аватар профиля"
            />
          </button>
          <div className="profile-info">
            <h1 className="profile-info__name">{userName}</h1>
            <button
              type="button"
              className="profile-info__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile-info__description">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="elements">
          {cards.map((item) => (
            <li className="element" key={item._id}>
              <img className="element__mask" src={item.link} />
              <button type="button" className="element__delete-btn"></button>
              <div className="element-container">
                <h2 className="element-container__name">{item.name}</h2>
                <div className="element-container__like-box">
                  <button
                    type="button"
                    className="element-container__like-btn"
                  ></button>
                  <span className="element-container__span">
                    {item.likes.length}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
