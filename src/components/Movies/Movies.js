import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterByRequest } from '../../utils/functions';

function Movies({ loggedIn }) {

    const [searchInput, setSearchInput] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [cardsList, setCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    // search form & cards setup
    useEffect(() => {
        // search form setup
        let previousInputs = getSearchInputsLocal();
        if (previousInputs) {
            console.log('searched before');
            // searched before
            console.log(previousInputs);
            setSearchInputs(previousInputs);
            // забрать карточки из локала и отрендерить если они есть
        } else {
            console.log('no search before');
            // no search before then all cards setup
            
        }
    }, []);  

    // local save & read handlers
    function saveSearchInputsLocal(values) {
        localStorage.setItem('moviesSearchValues', JSON.stringify(values));
    }

    function getSearchInputsLocal() {
        JSON.parse(localStorage.getItem('moviesSearchValues'));
    }

    function saveCardListLocal(cards) {
        localStorage.setItem('movies', JSON.stringify(cards));
    }

    function getCardListLocal() {
        JSON.parse(localStorage.getItem('movies'));
    }

    // MoviesApi requests
    function getAllMovies() {
        setIsLoading(true);
        MoviesApi
            .getCards()
            .then((data) => {
                console.log('all films get');
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // search & filter handlers
    function setSearchInputs(input) {
        setSearchInput(input.request);
        setIsFiltered(input.isChecked);
    }

    function handleSearchSubmit(values) {
        saveSearchInputsLocal(values);
        setSearchInputs(values);
        getAllMovies();
        // if none set gallery message
        // filter
        //save local
        // render
    }

    // sidebar handlers
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
                            searchInput={searchInput}
                            isFiltered={isFiltered}
                            onSubmit={handleSearchSubmit}
                        />
                    </div>

                </div>

                {isLoading
                ? <Preloader />
                : <>
                    <div className="movies__movies-list">
                    <MoviesCardList 
                        cards={cardsList}
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
