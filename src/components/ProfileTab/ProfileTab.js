import React from "react";
import { Link } from "react-router-dom";
import UserTab from "../UserTab/UserTab";

function ProfileTab({ loggedIn }) {
    

    return (
        <div className={`
                profile-tab 
                ${loggedIn && 'profile-tab_logged'}
            `}
        >
            {loggedIn? (
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