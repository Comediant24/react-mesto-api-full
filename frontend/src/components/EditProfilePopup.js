import React, { createRef, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import Input from './Input';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const valid = createRef();
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    setIsValid(valid.current.checkValidity());
  }, [setIsValid, valid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      ref={valid}
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
    >
      <Input
        value={values.name}
        changeValue={handleChange}
        classBlock="popup"
        name="name"
        type="text"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        validationMessage={errors.name}
      />
      <Input
        value={values.about}
        changeValue={handleChange}
        classBlock="popup"
        name="about"
        type="text"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        validationMessage={errors.about}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
