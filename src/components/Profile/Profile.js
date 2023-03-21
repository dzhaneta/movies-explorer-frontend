import React from "react";
import Header from '../Header/Header';

function Profile({ loggedIn }) {
    // functionality

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="profile"></main>
        </>
    );

}

export default Profile;