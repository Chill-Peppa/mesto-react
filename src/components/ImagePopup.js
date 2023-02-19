import React from "react";

function ImagePopup() {
  return (
    <div className="popup popup_type_open-photo">
      <div className="popup__main">
        <button type="button" className="popup__close"></button>
        <figure className="popup__main-content">
          <img className="popup__open-photo" />
          <figcaption className="popup__open-caption"></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
