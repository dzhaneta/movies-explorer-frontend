import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Login() {

  const inputs = [
    {
      label: 'E-mail',
      name: 'email',
      type: 'text',
      errorMessage: '',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      errorMessage: 'Что-то пошло не так...',
    },
  ];

  const additional = {
    text: 'Ещё не зарегистрированы?',
    name: 'Регистрация',
    link: '/signup',
  };

  return (
    <AuthPage
      title='Рады видеть!'
      submitButtonText='Войти'
      additional={additional}
      inputs={inputs}
    />
  );
}

export default Login;