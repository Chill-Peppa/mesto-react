import React from "react";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="element">
      <img
        className="element__mask"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button type="button" className="element__delete-btn"></button>
      <div className="element-container">
        <h2 className="element-container__name">{card.name}</h2>
        <div className="element-container__like-box">
          <button type="button" className="element-container__like-btn" />
          <span className="element-container__span">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
