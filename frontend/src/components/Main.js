import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  isCardsLoading,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <button
          type="button"
          onClick={onEditAvatar}
          className="button button_non-opacity profile__button-avatar"
        >
          <img
            className="profile__avatar"
            src={avatar}
            alt="Аватар пользователя"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{name}</h1>
          <button
            className="button profile__user-edit-button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать информацию пользователя"
          ></button>
          <p className="profile__user-job">{about}</p>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить информацию"
        ></button>
      </section>
      <section className="places">
        <ul className="places__cards">
          {isCardsLoading ? (
            <div className="places__loading-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onCardClick={onCardClick}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
}

export default Main;
