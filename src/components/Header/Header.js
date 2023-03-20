import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";


function Header({loggedIn}) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleOpenMenu() {
        setIsMenuOpen(true);
    }

    function handleCloseMenu() {
        setIsMenuOpen(false);
    }

    return (
        <div className={(location.pathname === "/") ? 
        'header  header_colored' : 'header'}>
            <Logo />

            <button 
                className="header__burgermenu header__link"
                onClick={handleOpenMenu}>
            </button>

            {isMenuOpen && 
            <div className="header__overlay">
                <button
                    className="header__overlay-close-button header_link"
                    onClick={handleCloseMenu}>
                </button>
            </div>}

            <Navigation loggedIn={loggedIn} />

            <div className={`
                header__profile 
                ${loggedIn && 'header__profile_logged'}
                ${isMenuOpen && 'header__profile_menu-view'}
            `}>
                {loggedIn? (
                    <Link 
                        className="
                            header__link 
                            header__link_account
                            link"
                        to="/profile">
                            <p className="header__profile-username">Аккаунт</p>
                            <div className="header__profile-icon"></div>
                    </Link>
                ) : (
                    <>
                    <Link 
                        className="
                            header__link
                            header__link_signup 
                            link" 
                        to="/signup">
                            Регистрация
                    </Link>
                    <Link 
                        className="
                            header__link 
                            header__link_signin 
                            link" 
                        to="/signin">
                            Войти
                    </Link>
                </>
                )}
            </div>

        </div>
    );

}

export default Header;