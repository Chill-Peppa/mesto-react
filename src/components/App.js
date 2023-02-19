import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  return (
    <div className="App">
      <body className="root">
        <div className="page">
          <Header />
          <Main />
          <Footer />
          <PopupWithForm
            title="Редактировать профиль"
            name="edit-button"
            btnText="Сохранить"
          >
            <input
              id="firstname-input"
              type="text"
              name="name"
              placeholder="Имя пользователя"
              className="form__item form__item_info_name"
              minlength="2"
              maxlength="40"
              required
            />
            <span className="firstname-input-error form__item-error"></span>
            <input
              id="career-input"
              type="text"
              name="about"
              placeholder="Род деятельности"
              className="form__item form__item_info_job"
              minlength="2"
              maxlength="200"
              required
            />
            <span className="career-input-error form__item-error"></span>
          </PopupWithForm>

          <PopupWithForm name="add-photo" title="Новое место" btnText="Создать">
            <input
              id="title-input"
              type="text"
              name="name"
              placeholder="Название"
              className="form__item form__item_info_title"
              minlength="2"
              maxlength="30"
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

          <ImagePopup />
          <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            btnText="Создать"
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

        <template id="element-template">
          <li className="element">
            <img className="element__mask" />
            <button type="button" className="element__delete-btn"></button>
            <div className="element-container">
              <h2 className="element-container__name"></h2>
              <div className="element-container__like-box">
                <button
                  type="button"
                  className="element-container__like-btn"
                ></button>
                <span className="element-container__span"></span>
              </div>
            </div>
          </li>
        </template>
      </body>
    </div>
  );
}

export default App;
