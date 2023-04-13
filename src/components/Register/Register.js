import React from 'react';
import AuthPage from '../AuthPage/AuthPage';
import { regexes } from '../../utils/constants';

function Register({ onRegister, infoMessage, setinfoMessage }) {  

  function handleRegisterSubmit(values) {
    onRegister(values);
  }

  const inputs = [
    {
      label: 'Имя',
      name: 'name',
      type: 'text',
      pattern: regexes.name,
      minLength: '2',
      maxLength: '30',
      placeholder: 'Ivan Ivanov',
      errorMessage: '',
    },
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
    text: 'Уже зарегистрированы?',
    name: 'Войти',
    link: '/signin',
  };

  return (
    <AuthPage
      onSubmit={handleRegisterSubmit}
      page='register'
      title='Добро пожаловать!'
      submitButtonText='Зарегистрироваться'
      additional={additional}
      inputs={inputs}
      infoMessage={infoMessage}
      setinfoMessage={setinfoMessage}
    />
  );
}

export default Register;