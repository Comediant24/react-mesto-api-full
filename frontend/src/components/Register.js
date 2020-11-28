import React from 'react';
import AuthForm from './AuthForm';

const Register = ({ onRegister }) => {
  const handleSubmit = (e, registerForm) => {
    e.preventDefault();
    const { email, password } = registerForm;
    onRegister(email, password);
  };

  return (
    <div>
      <AuthForm
        className="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        loginLink={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;
