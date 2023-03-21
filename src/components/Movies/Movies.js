import React from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";

function Movies({ loggedIn }) {
    // functionality

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className="movies"></main>
            <Footer />
        </>
    );

}

export default Movies;