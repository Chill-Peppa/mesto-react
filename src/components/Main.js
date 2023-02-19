import React from "react";
import { api } from "../utils/api";
import Card from "./Card";

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
          {cards.map((item) => {
            return <Card card={item} key={item._id} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
