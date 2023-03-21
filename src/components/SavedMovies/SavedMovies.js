import React from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn }) {
    // functionality

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="saved-movies"></main>
            <Footer />
        </>
    );

}

export default SavedMovies;