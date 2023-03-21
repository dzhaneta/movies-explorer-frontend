import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";

function Navigation() {

    const location = useLocation();
    const isLoggedIn = React.useContext(LoggedInContext);
    console.log(isLoggedIn[1]);

    return (
        <nav 
            className={`
                navigation 
                ${ ( !isLoggedIn === true ) && 'navigation_hidden'}
            `}
        >
            <Link 
                className={`
                    navigation__link link 
                    ${location.pathname === "/movies" && 'navigation__link_active'}
                `}
                to="/movies"
            >
                Фильмы
            </Link>

            <Link 
                className={`
                    navigation__link link ${location.pathname === "/saved-movies" &&
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