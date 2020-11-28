import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

const InfoTooltip = ({ message, isOpen, isSuccess, onClose }) => {
  return (
    <section
      className={`infotooltip popup popup_infotooltip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div
        onClick={onClose}
        className="popup__overlay popup__overlay_infotooltip"
      ></div>
      <div className="infotooltip__container">
        <img
          src={isSuccess ? success : fail}
          alt={isSuccess ? 'Успешная регистрация' : 'Ошибка'}
          className={`infotooltip__image ${
            isSuccess ? 'infotooltip__image_success' : 'infotooltip__image_fail'
          }`}
        ></img>
        <h3 className="infotooltip__title">{message}</h3>
        <button
          className="button popup__close-button popup__close-button_infotooltip"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
};

export default InfoTooltip;
