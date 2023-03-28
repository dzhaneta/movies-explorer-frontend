import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Register() {

  const inputs = [
    {
      label: 'Имя',
      name: 'name',
      type: 'text',
      pattern: '[- А-Яа-яA-Za-zё]+$',
      minLength: '2',
      maxLength: '30',
      placeholder: 'Ivan Ivanov',
      errorMessage: '',
    },
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
    text: 'Уже зарегистрированы?',
    name: 'Войти',
    link: '/signin',
  };

  return (
    <AuthPage
      title='Добро пожаловать!'
      submitButtonText='Зарегистрироваться'
      additional={additional}
      inputs={inputs}
    />
  );
}

export default Register;