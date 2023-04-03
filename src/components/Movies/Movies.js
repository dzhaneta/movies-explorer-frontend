import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterByText, filterByDuration } from '../../utils/functions';
import { messages } from '../../utils/constants';
import {
    saveSearchInputsLocal,
    getSearchInputsLocal,
    saveAllCardsLocal,
    getAllCardsLocal,
    saveSavedCardsLocal,
    getSavedCardsLocal,
    addSavedCardsLocal,
    deleteFromSavedCardsLocal,
    saveResultCardsLocal,
    getResultCardsLocal
} from '../../utils/functionsLocalStorage';

function Movies({ loggedIn }) {
    const [isSearchFormInitialized, setIsSearchFormInitialized] = useState(false);
    const [searchFormInitialState, setSearchFormInitialState] = useState();
    const [isShortMoviesCheckboxActive, setIsShortMoviesCheckboxActive] = useState(false);
    const [savedCardsList, setSavedCardsList] = useState([]);
    const [cardsList, setCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    // info message state
    const [infoMessage, setinfoMessage] = useState({
        message: '',
        type: '',
    });

    // initial search form & cards setup
    useEffect(() => {
        console.log('работает маунт эффект');
        const previousInputs = getSearchInputsLocal();

        if (previousInputs) {
            // searched before
            console.log('searched before');
            console.log(previousInputs);
            setSearchFormInitialState(previousInputs);
            setIsShortMoviesCheckboxActive(previousInputs.isChecked)
            filterAllMoviesAndSetResult(previousInputs);
        } else {
            // no search before
            console.log('no search before');
        }
        setIsSearchFormInitialized(true);
    }, []);

    // filter by duration
    useEffect(() => {
        console.log('работает установка формы эффект');
        if (isSearchFormInitialized) {
            setCardsList(
                filterByDuration(
                    isShortMoviesCheckboxActive,
                    getResultCardsLocal()
                ) || []
            );
            saveSearchInputsLocal({ isChecked: isShortMoviesCheckboxActive });
        }
    }, [isShortMoviesCheckboxActive, isSearchFormInitialized]);

    // refresh render cards likes
    useEffect(() => {
        filterAllMoviesAndSetResult(getSearchInputsLocal());
    }, [savedCardsList]);


    // get all movies
    function getAllMovies() {
        const localCards = getAllCardsLocal();

        if (!localCards) {
            return MoviesApi
                .getCards()
                .then((data) => {
                    console.log('all films get from API');
                    saveAllCardsLocal(data);
                    return data;
                })
                .catch(() => {
                    console.log('ответ movies апи не пришел');
                    setinfoMessage({
                        message: messages.moviesApiError,
                        type: 'error',
                    });
                });
        }

        return Promise.resolve(localCards);
    }

    // get saved movies
    function getSavedMovies() {
        const savedCards = getSavedCardsLocal();

        if (!savedCards) {
            return MainApi
                .getCards()
                .then((data) => {
                    console.log('saved films get from API');
                    saveSavedCardsLocal(data);
                    return data;
                })
                .catch(() => {
                    console.log('ответ main апи не пришел');
                    setinfoMessage({
                        message: messages.moviesApiError,
                        type: 'error',
                    });
                });
        }

        return Promise.resolve(savedCards);
    }

    // actualize all cards likes
    function getAllMoviesWithLikes() {
        console.log('добавляем всем карточкам лайки');

        return Promise.all([ getAllMovies(), getSavedMovies()])
            .then(([ allCards, savedCards]) => {
                console.log(allCards);
                console.log(savedCards);
                console.log('добавляем лайки');

                if (savedCards.length !== 0) {
                    console.log('лайки есть');
                    allCards.forEach(card => {
                        card.isLiked = savedCards.some(
                            saved => saved.movieId === card.movieId
                        );
                    });
                } 

                saveAllCardsLocal(allCards);
                return allCards;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // filter movies with likes
    function filterAllMoviesAndSetResult(values) {
        getAllMoviesWithLikes()
            .then((data) => {
                console.log(data);
                console.log('фильтруем по всему');
                console.log(values.text);

                let filteredByText = [];

                if (values.text !== '') {
                    console.log('фильтруем по слову');
                    filteredByText = filterByText(values.text, data) || [];

                    console.log(filteredByText);
                    saveResultCardsLocal(filteredByText);
                    return filteredByText;
                }
                
                console.log('фильтруем по чекбоксу');
                console.log(filteredByText);

                const filteredByDuration = filterByDuration(
                    isShortMoviesCheckboxActive,
                    filteredByText
                ) || [];
                
                console.log(filteredByDuration);
                setCardsList(filteredByDuration);

                if (filteredByDuration.length === 0) {
                    setinfoMessage({
                        message: messages.moviesNoResult,
                        type: 'info',
                    });
                }
            })
            .catch((e) => {
                console.error(e);
                setinfoMessage({
                    message: messages.moviesApiError,
                    type: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // search & filter handlers

    function searchMovies(values) {
        setIsLoading(true);
        console.log('пошел поиск');
        console.log(values);
        saveSearchInputsLocal(values);
        filterAllMoviesAndSetResult(values);
    }

    // card like-dislike handler
    function handleCardLike(card) {
        if (card.isLiked) {
            MainApi
                .deleteCard(card.movieId)
                .then(() => {
                    let newSavedCardList = savedCardsList
                        .filter((item) => item.movieId !== card.movieId);
                    setSavedCardsList(newSavedCardList);
                    deleteFromSavedCardsLocal(card);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            MainApi
                .saveCard(card)
                .then((newCard) => {
                    setSavedCardsList([...savedCardsList, {newCard: { isLiked: true }}]);
                    addSavedCardsLocal(newCard.isLiked);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                                isChecked={isShortMoviesCheckboxActive}
                                onCheckboxChange={setIsShortMoviesCheckboxActive}
                                onSubmit={searchMovies}
                            />
                        </div>

                    </div>
                }

                {isLoading
                ? <Preloader />
                : <>
                    {cardsList.length === 0
                        ?   <div className="movies__movies-list_empty">
                                <span
                                    className={`
                                        movies__message
                                        movies__message_type_${infoMessage.type}
                                    `}
                                >
                                    {infoMessage.message}
                                </span>
                            </div>
                        :   <>
                                <div className="movies__movies-list">
                                    <MoviesCardList
                                        cards={cardsList}
                                        type={'movies'}
                                        onCardLike={handleCardLike}
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