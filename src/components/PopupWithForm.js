import React from "react";

function PopupWithForm({ name, title, isOpen, onClose, children, btnText }) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__heading">{`${title}`}</h2>
        <form className="form" name={`form-${name}_dlt-confirm`}>
          {children}
          <button
            type="button"
            className="form__button-submit form__button-submit_confirm"
          >
            {`${btnText}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
