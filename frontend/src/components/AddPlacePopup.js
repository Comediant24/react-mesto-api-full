import React, { createRef, useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import Input from './Input';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
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
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      ref={valid}
      name="add-places"
      title="Новое место"
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
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
        autoComplete="off"
        validationMessage={errors.name}
      />
      <Input
        value={values.link}
        changeValue={handleChange}
        classBlock="popup"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        validationMessage={errors.link}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
