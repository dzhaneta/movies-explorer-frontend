import React from 'react';
import AuthPage from '../AuthPage/AuthPage';

function Register() {

  const inputs = [
    {
      label: 'Имя',
      name: 'name',
      type: 'text',
      errorMessage: '',
    },
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