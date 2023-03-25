import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthInput from '../AuthInput/AuthInput';

function AuthPage({
  title,
  submitButtonText,
  additional,
  inputs,
}) {

  const [credentials, setCredentials] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit: ', credentials); // temporary for funcionality
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  return (
    <main className='auth-page'>

      <div className='auth-page__title-container'>

        <Logo />
        <h1 className='auth-page__title'>{title}</h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className='auth-page__form'
      >

        <fieldset className='auth-page__inputs'>

          {inputs &&
            inputs.map((input) => (

              <AuthInput
                label={input.label}
                value={
                  credentials && credentials[input.name]
                    ? credentials[input.name]
                    : ''
                }
                name={input.name}
                type={input.type}
                onChange={handleChange}
                errorMessage={input.errorMessage}
                key={input.name}
              />

            ))}

        </fieldset>

        <span className="error"></span>

        <button
          className='auth-page__submit-button auth-page__submit-button_active app__button'
          type='submit'
        >
          {submitButtonText}
        </button>

      </form>

      <p className='auth-page__extra'>
        {additional.text}{' '}
        <Link
          className='auth-page__auth-link'
          to={additional.link}
        >
          {additional.name}
        </Link>
      </p>

    </main>
  );
}

export default AuthPage;