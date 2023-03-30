import React from "react";
import { Link } from "react-router-dom";

function UserTab({ vertical }) {

    return (
        <Link 
            className={`
                usertab
                ${vertical && 'usertab_vertical'}
            `}
            to="/profile"
        >
            <p className="usertab__username">Аккаунт</p>
            <div className="usertab__icon"></div>
        </Link>
    );

}

export default UserTab;