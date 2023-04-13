import React from 'react';
import AuthPage from '../AuthPage/AuthPage';
import { regexes } from '../../utils/constants';

function Login({ onLogin, infoMessage, setinfoMessage }) {

  function handleLoginSubmit(values) {
    onLogin(values);
  }

  const inputs = [
    {
      label: 'E-mail',
      name: 'email',
      type: 'email',
      pattern: regexes.email,
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
      onSubmit={handleLoginSubmit}
      page='login'
      title='Рады видеть!'
      submitButtonText='Войти'
      additional={additional}
      inputs={inputs}
      infoMessage={infoMessage}
      setinfoMessage={setinfoMessage}
    />
  );
}

export default Login;