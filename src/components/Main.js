import React from "react";

function handleEditAvatarClick() {
  const popupWithAvatar = document.querySelector(".popup_type_edit-avatar");
  popupWithAvatar.classList.add("popup_opened");
}

function handleAddPlaceClick() {
  const popupWithAdd = document.querySelector(".popup_type_add-photo");
  popupWithAdd.classList.add("popup_opened");
}

function handleEditProfileClick() {
  const popupWithEdit = document.querySelector(".popup_type_edit-button");
  popupWithEdit.classList.add("popup_opened");
}

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__area">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={handleEditAvatarClick}
          >
            <img
              className="profile__avatar"
              src="<%=require('./images/avatar.jpg')%>"
              alt="Аватар профиля"
            />
          </button>
          <div className="profile-info">
            <h1 className="profile-info__name">Жак-Ив Кусто</h1>
            <button
              type="button"
              className="profile-info__edit-button"
              onClick={handleEditProfileClick}
            ></button>
            <p className="profile-info__description">Исследователь океана</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="cards">
        <ul className="elements"></ul>
      </section>
    </main>
  );
}

export default Main;
