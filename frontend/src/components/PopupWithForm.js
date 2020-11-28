import React, { forwardRef } from 'react';

const PopupWithForm = forwardRef(
  (
    {
      isValid = true,
      name,
      title,
      children,
      isOpen,
      onClose,
      onSubmit,
      buttonText,
    },
    ref
  ) => {
    return (
      <section
        className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}
      >
        <div
          onClick={onClose}
          className={`popup__overlay poup__overlay_${name}`}
        ></div>
        <form
          ref={ref}
          className={`popup__form popup__form_${name}`}
          name={name}
          action="#"
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__input-container">{children}</fieldset>
          <button
            className={`button popup__submit-button popup__button-profile ${
              isValid ? '' : 'popup__submit-button_disabled'
            }`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText || 'Сохранить'}
          </button>
          <button
            className={`button popup__close-button popup__close-button_${name}`}
            onClick={onClose}
            type="button"
            aria-label="Закрыть окно"
          ></button>
        </form>
      </section>
    );
  }
);

export default PopupWithForm;
