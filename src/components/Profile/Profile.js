import React, { useState, useEffect, useContext } from "react";
import { currentUserContext } from '../../contexts/currentUserContex';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import Header from '../Header/Header';
import SideBarMenu from '../SideBarMenu/SideBarMenu';

function Profile({
    loggedIn,
    onUpdateUser,
    onSignOut,
    apiErrorMessage,
    setApiErrorMessage
}) {

    const user = useContext(currentUserContext);

    // form states & handlers
    const { 
        values,
        handleChange,
        setValues,
        errors,
        isValid,
        setIsValid
    } = useFormWithValidation();

    // set current user values
    useEffect(() => {
        user && setValues(user);
    }, [user, setValues]);

    // check values are not the same
    useEffect(() => {
        if (user.name === values.name && user.email === values.email) {
          setIsValid(false);
        }
    }, [user, setIsValid, values]);

    // set api error  
    useEffect(() => {
      setApiErrorMessage({
        message: '',
        type: '',
      });
    }, [setApiErrorMessage]);
  
    function handleFormSubmit(e) {
      e.preventDefault();
      onUpdateUser(values);
    }
  
    function handleInputChange(e) {
      handleChange(e);
        console.log(errors);
      apiErrorMessage &&
        setApiErrorMessage({
          message: '',
          type: '',
        });
    }
  
    // sidebar states & handlers
    
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    function handleOpenSideBarMenu() {
        setSideBarOpen(true);
    }

    function handleCloseSideBarMenu() {
        setSideBarOpen(false);
    }

    return (
        <>
            <Header 
                loggedIn={loggedIn}
                onSideBarOpen={handleOpenSideBarMenu}
            />

            <main className='profile'>

                <h1 className='profile__title'>Привет, {user.name}!</h1>

                <form
                    onSubmit={handleFormSubmit}
                    className='profile__form'
                >

                    <fieldset className='profile__inputs'>

                        <label className='profile__label'>
                            Имя
                            <input
                                onChange={handleInputChange}
                                type='text'
                                value={values.name || ''}
                                name='name'
                                required
                                pattern='[- А-Яа-яA-Za-zё]+$'
                                minLength='2'
                                maxLength='30'
                                placeholder='Ivan Ivanov'
                                className='profile__input'
                            />
                        </label>
                        <span 
                            className={`
                                profile__input-error
                            `}
                        >
                            {errors.name}
                        </span>
                        
                        <label className='profile__label'>
                            E-mail
                            <input
                                onChange={handleInputChange}
                                type='text'
                                value={values.email || ''}
                                name='email'
                                required
                                className='profile__input'
                            />
                        </label>
                        <span className="profile__input-error">
                            {errors.email}
                        </span>

                    </fieldset>

                    <span className={`
                        profile__api-error
                        profile__api-error_type_${apiErrorMessage.type}
                        `}
                        >
                        {apiErrorMessage.message}
                    </span>

                    <button
                        className={`
                            profile__button 
                            profile__button_active
                            ${!isValid && 'profile__button_inactive'}
                        `}
                        type='submit'
                    >
                        Редактировать
                    </button>

                    <button
                        onClick={onSignOut}
                        className={`
                            profile__button
                            profile__button_type_logout
                        `}
                        type='button'
                    >
                        Выйти из аккаунта
                    </button>

                </form>

            </main>
            
            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={handleCloseSideBarMenu}
            />
        </>
    );

}

export default Profile;