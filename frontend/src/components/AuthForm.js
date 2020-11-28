import React, { createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import Input from './Input';

const AuthForm = ({
  className,
  title = 'Заголовок формы',
  buttonText = 'Сабмит формы',
  loginLink,
  onSubmit,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  const valid = createRef();
  useEffect(() => {
    setIsValid(valid.current.checkValidity());
  }, [setIsValid, valid]);

  const handleSubmit = (e) => {
    onSubmit(e, values);
    resetForm();
  };

  return (
    <form
      ref={valid}
      className={`auth-form ${className}`}
      onSubmit={handleSubmit}
      name={className}
      action="#"
      noValidate
    >
      <h3 className="auth-form__title">{title}</h3>
      <fieldset className="auth-form__container">
        <Input
          value={values.email}
          changeValue={handleChange}
          classBlock="auth-form"
          name="email"
          type="email"
          placeholder="Email"
          required
          // autoComplete="off"
          validationMessage={errors.email}
        />
        <Input
          value={values.password}
          changeValue={handleChange}
          classBlock="auth-form"
          name="password"
          type="password"
          placeholder="Пароль"
          required
          autoComplete="off"
          validationMessage={errors.password}
        />
      </fieldset>
      <button
        type="submit"
        aria-label="Отправить данные"
        className={`button auth-form__button auth-form__button_submit ${
          isValid ? '' : 'auth-form__button_submit_disabled'
        }`}
        disabled={!isValid}
      >
        {buttonText}
      </button>
      <Link to="/sign-in" className="link auth-form__is-login-link">
        {loginLink ? 'Уже зарегестрированны? Войти' : ''}
      </Link>
    </form>
  );
};

export default AuthForm;
