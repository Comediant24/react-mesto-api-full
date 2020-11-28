import React from 'react';
import AuthForm from './AuthForm';

const Login = ({ onLogin }) => {
  const handleSubmit = (e, registerForm) => {
    e.preventDefault();
    const { email, password } = registerForm;
    onLogin(email, password);
  };

  return (
    <div>
      <AuthForm
        className="login"
        title="Вход"
        buttonText="Войти"
        loginLink={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
