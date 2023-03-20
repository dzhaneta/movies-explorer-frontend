import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation({loggedIn}) {
    const location = useLocation();

    return (
        <nav className={`${!loggedIn && "navigation_hidden"} navigation`}>
            <Link className={`
                navigation__link link ${location.pathname === "/movies" &&
                'navigation__link_active'}
            `}>Фильмы</Link>
            <Link className={`
                navigation__link link ${location.pathname === "/saved-movies" &&
                'navigation__link_active'}
            `}>Сохраненные фильмы</Link>
        </nav>
    );

}

export default Navigation;