import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_image-places ${
        card.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div
        onClick={onClose}
        className="popup__overlay popup__overlay_image-places"
      ></div>
      <figure className="popup__places">
        <img
          src={card.link}
          alt={`Лучшая фотография ${card.name}`}
          className="popup__places-image"
        />
        <figcaption className="popup__places-title">{card.name}</figcaption>
        <button
          className="button popup__close-button popup__close-button_image-places"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </figure>
    </section>
  );
}

export default ImagePopup;
