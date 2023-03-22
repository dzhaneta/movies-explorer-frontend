import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";

function Navigation({ vertical }) {

    const location = useLocation();
    const isLoggedIn = React.useContext(LoggedInContext);

    return (
        <nav 
            className={`
                navigation 
                ${ ( !isLoggedIn === true ) && 'navigation_hidden'}
                ${vertical && 'navigation_vertical'}
            `}
        >
            <Link
                className={`
                    navigation__link 
                    ${location.pathname === "/" && 'navigation__link_active'}
                    ${!vertical && 'navigation__link_hidden'}
                `}
                to="/"
            >
                Главная
            </Link>
            <Link 
                className={`
                    navigation__link 
                    ${location.pathname === "/movies" && 'navigation__link_active'}
                `}
                to="/movies"
            >
                Фильмы
            </Link>

            <Link 
                className={`
                    navigation__link ${location.pathname === "/saved-movies" &&
                    'navigation__link_active'}
                `}
                to="/saved-movies"
            >
                Сохраненные фильмы
            </Link>
        </nav>
    );

}

export default Navigation;