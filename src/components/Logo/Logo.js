import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo_green.svg";

function Logo() {

    return (
        <Link className="logo link" to="/">
            <img className="logo__pic" src={logoPath} alt="логотип" />
        </Link>
        
    );

}

export default Logo;