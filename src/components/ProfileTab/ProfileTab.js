import React from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";
import UserTab from "../UserTab/UserTab";

function ProfileTab() {
    
    const isLoggedIn = React.useContext(LoggedInContext);

    return (
        <div className={`
                profile-tab 
                ${isLoggedIn && 'profile-tab_logged'}
            `}
        >
            {isLoggedIn? (
                <UserTab />
            ) : (
                <>
                    <Link 
                        className="
                            profile-tab__link
                            profile-tab__link_signup 
                        " 
                        to="/signup"
                    >
                        Регистрация
                    </Link>

                    <Link 
                        className="
                            profile-tab__link 
                            profile-tab__link_signin 
                        " 
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