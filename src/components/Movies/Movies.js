import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterByRequest, filterByDuration } from '../../utils/functions';

function Movies({ loggedIn }) {

    const [searchInput, setSearchInput] = useState('');
    const [result, setResult] = useState([]);
    const [filter, setFilter] = useState(false);
    const [isSearchFormInitialized, setIsSearchFormInitialized] = useState(false);
    const [cardsList, setCardsList] = useState([]);
    const [isCardsListEmpty, setIsCardsListEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    // info message state
    const [infoMessage, setinfoMessage] = useState({
        message: '',
        type: '',
    });

    // search form & cards setup
    useEffect(() => {
        let previousInputs = getSearchInputsLocal();
        if (previousInputs) {
            console.log('searched before');
            // searched before
            console.log(previousInputs);
            setSearchInputs(previousInputs);
            setIsSearchFormInitialized(true);
        } else {
            console.log('no search before');
            // no search before
            setIsSearchFormInitialized(true);
            setIsCardsListEmpty(true);
        }
    }, []);  

    // filter effect
    useEffect(() => {
        console.log('пошел эффект фильтра');
        // записать фильтр локально !!!!
        let cards = getResultCardsLocal();
        let shownCards = filterByDuration(filter, cards);
        console.log(shownCards);
        if (shownCards) {
            setCardsList(shownCards);
            setIsCardsListEmpty(false);
        } else {
            setIsCardsListEmpty(true);
        }
    }, [filter, result]);  

    // local save & read handlers
    function saveSearchInputsLocal(values) {
        localStorage.setItem('moviesSearchValues', JSON.stringify(values));
    }

    function getSearchInputsLocal() {
        return JSON.parse(localStorage.getItem('moviesSearchValues'));
    }

    function saveAllCardsLocal(cards) {
        localStorage.setItem('movies-all', JSON.stringify(cards));
    }

    function getAllCardsLocal() {
        return JSON.parse(localStorage.getItem('movies-all'));
    }

    function saveResultCardsLocal(cards) {
        localStorage.setItem('movies-result', JSON.stringify(cards));
    }

    function getResultCardsLocal() {
        return JSON.parse(localStorage.getItem('movies-result'));
    }

    // get all movies
    function getAllMovies() {
        if (!getAllCardsLocal()) {
            return MoviesApi
                .getCards()
                .then((data) => {
                    console.log('all films get from API');
                    return data;
                })
                .then((data) => {
                    saveAllCardsLocal(data);
                    return data;
                })
                .catch((err) => {
                    console.log('ответ апи не пришел');
                    console.log(err);
                });
        }
        
        return Promise.resolve(getAllCardsLocal());
    }

    // search & filter handlers
    function setSearchInputs(input) {
        setSearchInput(input.request);
        setFilter(input.isChecked);
    }

    function handleSearchSubmit(values) {
        console.log(values);
        saveSearchInputsLocal(values);
        setSearchInputs(values);
        return getAllMovies()
            .then((data) => {
                return filterByRequest(searchInput, data);
            })
            .then((res) => {
                console.log(res);
                saveResultCardsLocal(res);
                setResult(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
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

                {isSearchFormInitialized && 
                    <div className="movies__search-form-wrap">

                        <div className="movies__search-form">
                            <SearchForm
                                searchInput={searchInput}
                                filter={filter}
                                setFilter={setFilter}
                                onSubmit={handleSearchSubmit}
                            />
                        </div>

                    </div>
                }

                {isLoading
                ? <Preloader />
                : <>
                    {isCardsListEmpty
                        ? <div className="movies__movies-list_empty"></div>
                        :   <>
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
