import React, { useState, useEffect } from "react";
import MainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import { messages } from '../../utils/constants';
import {
    getSavedMovies,
    filterByDuration,
    filterMovies,
} from '../../utils/functionsMovies';
import {
    
    saveFilteredByDuration,
    saveSavedCardsLocal,
    getSavedCardsLocal,
} from '../../utils/functionsLocalStorage';


function SavedMovies({ loggedIn }) {

    // search form states
    const [searchFormState, setSearchFormState] = useState({
        text: '',
        isChecked: false,
    });
    const [isShortMoviesCheckboxActive, setIsShortMoviesCheckboxActive] = useState(false);

    // cards gallery states
    const [savedCardsList, setSavedCardsList] = useState([]);
    const [renderedCardsList, setRenderedCardsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // additional states
    const [isSideBarOpen, setSideBarOpen] = useState(false);
    const [infoMessage, setInfoMessage] = useState({
        message: '',
        type: '',
    });

    // // initial gallery setup
    useEffect(() => {
        getSavedMovies()
            .then((data) => {
                setSavedCardsList(data);
                renderMovies(data);
            })
            .catch(() => {
                setInfoMessage({
                    message: messages.moviesApiError,
                    type: 'error',
                });
            })
    }, []);

    // // refresh by checkbox
    useEffect(() => {
        const prevSearchFormState = searchFormState;
        setSearchFormState({ ...prevSearchFormState, ...{ isChecked: isShortMoviesCheckboxActive }});
        if (prevSearchFormState.text !== '') {
            filterAndRender(searchFormState);
        } else {
            getSavedMovies()
                .then((data) => {
                    setSavedCardsList(data);
                    const filteredByDuration = filterByDuration(
                        isShortMoviesCheckboxActive,
                        data
                      ) || [];
                    saveFilteredByDuration(filteredByDuration);
                    renderMovies(filteredByDuration);
                })
                .catch(() => {
                    setInfoMessage({
                        message: messages.moviesApiError,
                        type: 'error',
                    });
                })
        }
        
    }, [isShortMoviesCheckboxActive]);

    // render movies
    function renderMovies(data) {
        if (data.length === 0) {
            setInfoMessage({
                message: messages.moviesNoResult,
                type: 'info',
            });
        } 
        setRenderedCardsList(data);
    }

    function filterAndRender(searchReq) {
        getSavedMovies()
            .then((data) => {
                setSavedCardsList(data);
                let filtered = filterMovies(data, searchReq);
                renderMovies(filtered);
            })
            .catch(() => {
                setInfoMessage({
                    message: messages.moviesApiError,
                    type: 'error',
                });
            })

        return Promise.resolve();
    }

    // search & filter handlers
    function searchMovies(values) {
        setIsLoading(true);
        setSearchFormState(values);

        filterAndRender(values)
            .finally(() => {
                setIsLoading(false);
            });
    }

    // card like-dislike handler
    function handleCardDelete(card) {
        
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
                    filterAndRender(searchFormState);
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
            
                    <div className="movies__search-form-wrap">

                        <div className="movies__search-form">
                            <SearchForm
                                initialState={searchFormState}
                                isChecked={isShortMoviesCheckboxActive}
                                onCheckboxChange={setIsShortMoviesCheckboxActive}
                                onSubmit={searchMovies}
                            />
                        </div>

                    </div>

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
                                <div 
                                    className='
                                    movies__movies-list
                                    saved-movies__movies-list
                                    '
                                >
                                    <MoviesCardList
                                        cards={renderedCardsList}
                                        type='saved-movies'
                                        onCardDelete={handleCardDelete}
                                    />
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
