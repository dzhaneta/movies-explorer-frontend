import React from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";

function ProfileTab() {
    
    const isLoggedIn = React.useContext(LoggedInContext);

    return (
        <div className={`
                profile-tab 
                ${isLoggedIn && 'profile-tab_logged'}
            `}
        >
            { isLoggedIn === true ? (
                <Link 
                    className="
                        profile-tab__link 
                        profile-tab__link_account
                        link"
                    to="/profile"
                >
                    <p className="profile-tab__username">Аккаунт</p>
                    <div className="profile-tab__icon"></div>
                </Link>
            ) : (
                <>
                    <Link 
                        className="
                            profile-tab__link
                            profile-tab__link_signup 
                            link" 
                        to="/signup"
                    >
                        Регистрация
                    </Link>

                    <Link 
                        className="
                            profile-tab__link 
                            profile-tab__link_signin 
                            link" 
                        to="/signin"
                    >
                        Войти
                    </Link>
                </>
            )}
        </div>
    );

}

export default ProfileTab;