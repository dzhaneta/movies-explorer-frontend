import React, { useState, useEffect } from "react";
import MainApi from "../../utils/MainApi";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { galleryPoints, messages } from '../../utils/constants';
import { filterByText, filterByDuration } from '../../utils/functions';
import {
    saveSearchReqSavedMoviesLocal,
    getSearchReqSavedMoviesLocal,
    saveSavedCardsLocal,
    getSavedCardsLocal,
    saveFilteredByDuration,
    getFilteredByDuration,
    saveRenderedCardsQty,
    getRenderedCardsQty
} from '../../utils/functionsLocalStorage';


function SavedMovies({ loggedIn }) {

    // search form states
    const [isSearchFormInitialized, setIsSearchFormInitialized] = useState(false);
    const [searchFormInitialState, setSearchFormInitialState] = useState();
    const [isShortMoviesCheckboxActive, setIsShortMoviesCheckboxActive] = useState(false);

    // cards gallery states
    const [initialCardsQty, setInitialCardsQty] = useState(0);
    const [cardsRowQty, setCardsRowQty] = useState(0);
    const [savedCardsList, setSavedCardsList] = useState([]);
    const [renderedCardsList, setRenderedCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // additional states
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [infoMessage, setInfoMessage] = useState({
        message: '',
        type: '',
    });

    // cards gallery render params
    useEffect(() => {
        let timer;
        setGalleryParams();

        function handleResize() {
            clearTimeout(timer);
            timer = setTimeout(() => setGalleryParams(), 500);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function setGalleryParams() {
        let point = galleryPoints.find(e => window.innerWidth >= e.width); 
        setInitialCardsQty(point.set);
        setCardsRowQty(point.add);
    }
    
    // // initial search form setup
    useEffect(() => {
        const previousInputs = getSearchReqSavedMoviesLocal();

        if (previousInputs) {
            setSearchFormInitialState(previousInputs);
            setIsShortMoviesCheckboxActive(previousInputs.isChecked)
        } 

        setIsSearchFormInitialized(true);
    }, []);

    // refresh gallery inital, by checkbox
    useEffect(() => {
        if (isSearchFormInitialized) {
            if (getSavedCardsLocal()) {
                // refresh likes
                saveSearchReqSavedMoviesLocal({ isChecked: isShortMoviesCheckboxActive });

                getSavedMovies()
                    .then((data) => {
                        let filtered = filterMovies(data, getSearchReqSavedMoviesLocal());
                        renderMovies(filtered, getRenderedCardsQty());
                    })
                    .catch(() => {
                        setInfoMessage({
                            message: messages.moviesApiError,
                            type: 'error',
                        });
                    })
            } 
        }
    }, [isShortMoviesCheckboxActive, isSearchFormInitialized]);

    // rerender gallery
    useEffect(() => {
        console.log('rerender likes');
        getSavedMovies()
            .then((data) => {
                let filtered = filterMovies(data, getSearchReqSavedMoviesLocal());
                renderMovies(filtered, getRenderedCardsQty());
            })
            .catch(() => {
                setInfoMessage({
                    message: messages.moviesApiError,
                    type: 'error',
                });
            })

    }, [savedCardsList]);

    // get saved movies
    function getSavedMovies() {
        const savedCards = getSavedCardsLocal();
        
        if (!savedCards) {
            return MainApi
                .getCards()
                .then((data) => {
                    const savedCards = data.forEach(card => card.isLiked = true);
                    saveSavedCardsLocal(savedCards);
                    return savedCards;
                })
                .catch(() => {
                    setInfoMessage({
                        message: messages.moviesApiError,
                        type: 'error',
                    });
                });
        }

        return Promise.resolve(savedCards);
    }

    // filter movies 
    function filterMovies(data, values) {
        // filter by text
        let filteredByText = [];
        if (values.text !== '') {
            filteredByText = filterByText(values.text, data) || [];
        }
        // filter by checkbox
        const filteredByDuration = filterByDuration(
            isShortMoviesCheckboxActive,
            filteredByText
        ) || [];
        saveFilteredByDuration(filteredByDuration);
        return filteredByDuration;
    }

    function renderMovies(data, cardsQty) {
        if (data.length === 0) {
            setInfoMessage({
                message: messages.moviesNoResult,
                type: 'info',
            });
        } 
            // render gallery according to screen width
            const rendered = data.slice(0, cardsQty);
            rendered.length <= initialCardsQty
                ? saveRenderedCardsQty(initialCardsQty)
                : saveRenderedCardsQty(rendered.length);
            setRenderedCardsList(rendered);
        
    }

    // search & filter handlers
    function searchMovies(values) {
        setIsLoading(true);
        saveSearchReqSavedMoviesLocal(values);
        getSavedMovies()
            .then((data) => {
                let filtered = filterMovies(data, values);
                renderMovies(filtered, initialCardsQty);
            })
            .catch((e) => {
                console.error(e);
                setInfoMessage({
                    message: messages.moviesApiError,
                    type: 'error',
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    
    function handleShowMoreMovies() {
        const newCardsQty = renderedCardsList.length + cardsRowQty;
        const rendered = getFilteredByDuration().slice(0, newCardsQty);
        saveRenderedCardsQty(rendered.length);
        setRenderedCardsList(rendered);
    }
    
    // card like-dislike handler
    function handleCardLike(card) {
        
        if (card.isLiked) {
            const savedCardId = getSavedCardsLocal()
                .find(x => x.movieId === card.movieId)._id;

            MainApi
                .deleteCard(savedCardId)
                .then(() => {
                    let newSavedCardList = getSavedCardsLocal()
                        .filter((item) => item.movieId !== card.movieId);
                    saveSavedCardsLocal(newSavedCardList);
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
                    const newSavedCardsList = [ ...savedCardsList, newCard];
                    saveSavedCardsLocal(newSavedCardsList);
                    setSavedCardsList(newSavedCardsList);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                        {renderedCardsList.length === 0
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
                                <div className="
                                    movies__movies-list
                                    saved-movies__movies-list
                                    "
                                >
                                    <MoviesCardList 
                                        cards={renderedCardsList}
                                        type={'saved-movies'}
                                        onCardDelete={handleCardLike}
                                    />
                                </div>

                                <div className="movies__more">
                                    {renderedCardsList.length < getFilteredByDuration().length
                                    ? 
                                        <button 
                                            className="movies__more-button"
                                            onClick={handleShowMoreMovies}
                                        >
                                            Ещё
                                        </button>
                                    : <></>
                                    }
                                    
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

export default SavedMovies;
