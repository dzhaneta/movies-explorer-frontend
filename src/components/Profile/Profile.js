import React, { useState } from "react";
import { currentUserContext } from '../../contexts/currentUserContex';
import Header from '../Header/Header';
import SideBarMenu from '../SideBarMenu/SideBarMenu';

function Profile({ loggedIn, onSubmit}) {

    const user = React.useContext(currentUserContext);

    // form states & handlers

    const [input, setInput] = useState(user);

    function handleChangeInput(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(input);
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
                    onSubmit={handleSubmit}
                    className='profile__form'
                >

                    <fieldset className='profile__inputs'>

                        <label className='profile__label'>
                            Имя
                            <input
                                type='text'
                                value={input.name}
                                name='name'
                                required
                                onChange={handleChangeInput}
                                className='profile__input'
                            />
                        </label>
                        <span className="profile__input-error-message"></span>
                        
                        <label className='profile__label'>
                            E-mail
                            <input
                                type='text'
                                value={input.email}
                                name='email'
                                required
                                onChange={handleChangeInput}
                                className='profile__input'
                            />
                        </label>
                        <span className="profile__input-error-message"></span>

                    </fieldset>

                    <button
                        className='
                            profile__button 
                            profile__button_active 
                        '
                        type='submit'
                    >
                        Редактировать
                    </button>

                    <button
                        className='
                            profile__button
                            profile__button_type_logout
                        '
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