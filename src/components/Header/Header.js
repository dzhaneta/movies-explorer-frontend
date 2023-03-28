import React from "react";
import { useLocation } from "react-router-dom";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import ProfileTab from "../ProfileTab/ProfileTab";


function Header({ loggedIn, onSideBarOpen }) {

    const location = useLocation();

    return (
        <header 
            className={`
                header 
                ${location.pathname === "/" && 'header_colored'}
            `}
        >
            <Logo />

            <Navigation
                loggedIn={loggedIn} 
            />

            <ProfileTab
                loggedIn={loggedIn} 
            />

            {loggedIn &&
                <button 
                    className="header__burgermenu"
                    onClick={onSideBarOpen}>
                </button>
            }

        </header>
    );

}

export default Header;



<header>
    <logo></logo>

    <overlay>
        <nav></nav>
        <account></account>
    </overlay>
    
</header>