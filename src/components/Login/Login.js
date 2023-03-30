import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Login({ onLogin, apiErrorMessage, setApiErrorMessage }) {

  function handleLoginSubmit(values) {
    onLogin(values);
  }

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
      onSubmit={handleLoginSubmit}
      page='login'
      title='Рады видеть!'
      submitButtonText='Войти'
      additional={additional}
      inputs={inputs}
      apiErrorMessage={apiErrorMessage}
      setApiErrorMessage={setApiErrorMessage}
    />
  );
}

export default Login;