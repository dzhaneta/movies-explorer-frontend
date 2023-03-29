import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Logo from '../Logo/Logo';
import AuthInput from '../AuthInput/AuthInput';

function AuthPage({
  page,
  title,
  submitButtonText,
  additional,
  inputs,
}) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();


  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit: ', values); // temporary for funcionality
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

        <fieldset className={`auth-page__inputs ${page}__inputs`}>

          {inputs &&
            inputs.map((input) => (

              <AuthInput
                label={input.label}
                value={
                  values && values[input.name]
                    ? values[input.name]
                    : ''
                }
                name={input.name}
                type={input.type}
                pattern={input.pattern}
                minLength={input.minLength}
                maxLength={input.maxLength}
                placeholder={input.placeholder}
                onChange={handleChange}
                errorMessage={errors[input.name]}
                key={input.name}
              />

            ))}

        </fieldset>

        <span className="auth-page__api-error"></span>

        <button
          className={`
            auth-page__submit-button 
            ${!isValid && 'auth-page__submit-button_inactive'}
          `}
          type='submit'
          disabled={!isValid}
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