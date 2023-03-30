import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Login() {

  const inputs = [
    {
      label: 'E-mail',
      name: 'email',
      type: 'email',
      placeholder: 'ivanov@mail.ru',
      errorMessage: '',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      placeholder: 'Введите пароль',
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
      page='login'
      title='Рады видеть!'
      submitButtonText='Войти'
      additional={additional}
      inputs={inputs}
    />
  );
}

export default Login;