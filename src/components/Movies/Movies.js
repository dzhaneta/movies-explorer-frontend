import React, { useState, useEffect } from "react";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useWindowWidth  from '../../utils/useWindowWidth';
import { filterByText, filterByDuration } from '../../utils/functions';
import { galleryPoints, messages } from '../../utils/constants';
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

    // search form states
    const [isSearchFormInitialized, setIsSearchFormInitialized] = useState(false);
    const [searchFormInitialState, setSearchFormInitialState] = useState();
    const [isShortMoviesCheckboxActive, setIsShortMoviesCheckboxActive] = useState(false);
    
    // cards gallery states
    const windowWidth = useWindowWidth();
    const [galleryQty, setGalleryQty] = useState(0);
    const [galleryRowQty, setGalleryRowQty] = useState(0);
    const [savedCardsList, setSavedCardsList] = useState([]);
    const [cardsList, setCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // additional states
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [infoMessage, setinfoMessage] = useState({
        message: '',
        type: '',
    });

    // cards gallery render params
    useEffect(() => {
        // получить текущую ширину 
        console.log(windowWidth);
        // понять первичное кол-во карточек в галерее
        // понять кол-во карточек в строке для "еще"
        let point = galleryPoints.find(e => windowWidth <= e.width); 
        console.log(point);
        setGalleryQty(point.set);
        setGalleryRowQty(point.add);
        
        console.log(galleryQty);
        console.log(galleryRowQty);
        
    }, [windowWidth]);

    // initial search form & cards setup
    useEffect(() => {
        const previousInputs = getSearchInputsLocal();

        if (previousInputs) {
            setSearchFormInitialState(previousInputs);
            setIsShortMoviesCheckboxActive(previousInputs.isChecked)
            if (getAllCardsLocal()) {
                filterAllMoviesAndSetResult(previousInputs);
            } 
        } 

        setIsSearchFormInitialized(true);
    }, []);

    // filter by checkbox
    useEffect(() => {
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
        console.log('rerender likes');
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

        return Promise.all([ getAllMovies(), getSavedMovies()])
            .then(([ allCards, savedCards]) => {

                if (savedCards.length !== 0) {
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

                let filteredByText = [];

                if (values.text !== '') {
                    filteredByText = filterByText(values.text, data) || [];
                    saveResultCardsLocal(filteredByText);
                }

                const filteredByDuration = filterByDuration(
                    isShortMoviesCheckboxActive,
                    filteredByText
                ) || [];
                
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
        saveSearchInputsLocal(values);
        filterAllMoviesAndSetResult(values);
    }

    // card like-dislike handler
    function handleCardLike(card) {
        
        if (card.isLiked) {
            const savedCardId = getSavedCardsLocal()
                .find(x => x.movieId === card.id)._id;

            MainApi
                .deleteCard(savedCardId)
                .then(() => {
                    let newSavedCardList = getSavedCardsLocal()
                        .filter((item) => item.movieId !== card.id);
                    
                    
                    deleteFromSavedCardsLocal(savedCardId);
                    setSavedCardsList(newSavedCardList);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            MainApi
                .saveCard(card)
                .then((newCard) => {
                    newCard.isLiked = true;
                    addSavedCardsLocal(newCard);
                    const newSavedCardsList = [ ...savedCardsList, newCard];
                    setSavedCardsList(newSavedCardsList);
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
                            ? <div className="movies__movies-list_empty">
                                <span
                                    className={`
                                        movies__message
                                        movies__message_type_${infoMessage.type}
                                    `}
                                >
                                    {infoMessage.message}
                                </span>
                            </div>
                            : <>
                                <div className="movies__movies-list">
                                    <MoviesCardList
                                        cards={cardsList}
                                        type={'movies'}
                                        onCardLike={handleCardLike}
                                    />
                                </div>

                                <div className="movies__more">
                                    <button className="movies__more-button">
                                        Ещё
                                    </button>
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