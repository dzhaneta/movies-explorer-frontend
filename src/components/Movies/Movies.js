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
    const [isSearchFormInitialized, setIsSearchFormInitialized] = useState(false);
    const [searchFormInitialState, setSearchFormInitialState] = useState();
    const [cardsList, setCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);


    // info message state
    const [infoMessage, setinfoMessage] = useState({
        message: '',
        type: '',
    });

    // search form & cards setup
    useEffect(() => {
        const previousInputs = getSearchInputsLocal();

        if (previousInputs) {
            // searched before
            console.log('searched before');
            console.log(previousInputs);
            setSearchFormInitialState(previousInputs);
            const previousCardsResult = getResultCardsLocal() || [];
            setCardsList(previousCardsResult);
        } else {
            // no search before
            console.log('no search before');
        }
        setIsSearchFormInitialized(true);
    }, []);

    // local save & read handlers
    function saveSearchInputsLocal(values) {
        localStorage.setItem('moviesSearchValues', JSON.stringify(values));
    }

    function patchFilterSearchInputsLocal(filter) {
        const prev = getSearchInputsLocal();
        prev.isChecked = filter;
        saveSearchInputsLocal(prev);
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
        const localCards = getAllCardsLocal();

        if (!localCards) {
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

        return Promise.resolve(localCards);
    }

    // search & filter handlers

    function searchMovies(values) {
        console.log('пошел поиск');
        console.log(values);
        saveSearchInputsLocal(values);

        return getAllMovies()
            .then((data) => {
                return saveResultCardsLocal(
                    filterByRequest(values.request, data)
                );
            })
            .then((data) => {
                return filterByDuration(values.isChecked,data);
            })
            .then((cards) => {
                console.log(cards);
                saveResultCardsLocal(cards);
                setCardsList(cards);

                return cards;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function filterMovies(filter) {
        console.log('пошла фильтрация');
        
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
                                initialState={searchFormInitialState}
                                onFilter={filterMovies}
                                onSubmit={searchMovies}
                            />
                        </div>

                    </div>
                }

                {isLoading
                ? <Preloader />
                : <>
                    {cardsList.length === 0
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