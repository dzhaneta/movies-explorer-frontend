import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesList from '../../utils/moviesList';

function Movies({ loggedIn }) {

    const [isLoading] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    useEffect(() => {
        // local storage inputs checkup
   }, []);  

    function handleSearchSubmit(searchValues) {
        MoviesApi
            .getCards()
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
                        <SearchForm
                            onSubmit={handleSearchSubmit}
                        />
                    </div>

                </div>

                {isLoading
                ? <Preloader />
                : <>
                    <div className="movies__movies-list">
                    <MoviesCardList 
                        cards={moviesList}
                        type={'movies'}
                        />
                    </div>

                    <div className="movies__more">
                        <button className="movies__more-button">Ещё</button>
                    </div>
                </>
                
                }

            </main>

            <Footer />

            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={handleCloseSideBarMenu}
            />
        </>
    );

}

export default Movies;
