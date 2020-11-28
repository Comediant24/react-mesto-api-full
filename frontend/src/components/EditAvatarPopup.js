import React, { createRef, useEffect } from 'react';
import Input from './Input';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
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
    onUpdateAvatar(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      ref={valid}
      name="avatar-change"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      buttonText={isSending ? 'Сохранение...' : 'Сохранить'}
    >
      <Input
        value={values.avatar}
        changeValue={handleChange}
        classBlock="popup"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        validationMessage={errors.avatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
