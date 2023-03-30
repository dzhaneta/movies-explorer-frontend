import React, { useState } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMoviesList from '../../utils/savedMoviesList';

function SavedMovies({ loggedIn }) {

    const [isLoading] = useState(false);

    const [isSideBarOpen, setSideBarOpen] = useState(false);

    function handleOpenSideBarMenu() {
        setSideBarOpen(true);
    }

    function handleCloseSideBarMenu() {
        setSideBarOpen(false);
    }

    return (
        <>
            <Header
                loggedIn={loggedIn}
                onSideBarOpen={handleOpenSideBarMenu}
            />

            <main className="movies">
                <div className="movies__search-form-wrap">
                    <div className="movies__search-form">
                        <SearchForm />
                    </div>
                </div>

                {isLoading
                ? <Preloader />
                : <>
                    <div className="
                        movies__movies-list
                        saved-movies__movies-list
                        "
                    >
                        <MoviesCardList 
                            cards={savedMoviesList}
                            type={'saved-movies'}
                        />
                    </div>
                </>}
                
            </main>

            <Footer />

            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={handleCloseSideBarMenu}
            />
        </>
    );

}

export default SavedMovies;
