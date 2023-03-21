import React from "react";
import { useLocation } from "react-router-dom";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import ProfileTab from "../ProfileTab/ProfileTab";


function Header() {

    const location = useLocation();

    return (
        <header 
            className={`
                header ${location.pathname === "/" && 'header_colored'}
            `}
        >
            <Logo />

            <Navigation />

            <ProfileTab />

            <button 
                className="header__burgermenu link">
            </button>

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