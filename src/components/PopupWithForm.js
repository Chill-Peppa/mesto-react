import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className="popup__container">
        <button type="button" className="popup__close"></button>
        <h2 className="popup__heading">{`${props.title}`}</h2>
        <form
          className="form"
          name={`form-${props.name}_dlt-confirm`}
          novalidate
        >
          {props.children}
          <button
            type="button"
            className="form__button-submit form__button-submit_confirm"
          >
            {`${props.btnText}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
