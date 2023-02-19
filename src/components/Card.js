import React from "react";

function Card(props) {
  return (
    <li className="element" key={props.card._id}>
      <img className="element__mask" src={props.card.link} />
      <button type="button" className="element__delete-btn"></button>
      <div className="element-container">
        <h2 className="element-container__name">{props.card.name}</h2>
        <div className="element-container__like-box">
          <button
            type="button"
            className="element-container__like-btn"
          ></button>
          <span className="element-container__span">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
