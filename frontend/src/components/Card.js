import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id } = React.useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner === _id;
  const isLiked = card.likes.some((i) => i === _id);
  return (
    <li className="places__items">
      <img
        src={card.link}
        alt={`Лучшая фотография ${card.name}`}
        className="places__image"
        onClick={handleClick}
      />
      <div className="places__name">
        <h2 className="places__title">{card.name}</h2>
        <div className="places__like">
          <button
            className={`button places__button-like ${
              isLiked ? 'places__button-like_enabled' : ''
            }`}
            type="button"
            aria-label="Поставить лайк месту"
            onClick={handleLikeClick}
          ></button>
          <p className="places__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn ? (
        <button
          className="button places__button-delete"
          type="button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        ></button>
      ) : (
        ''
      )}
    </li>
  );
}

export default Card;
