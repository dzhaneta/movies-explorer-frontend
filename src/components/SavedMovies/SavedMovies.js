import React, { useState } from "react";
import MainApi from "../../utils/MainApi";
import MoviesPage from "../MoviesPage/MoviesPage";
import { messages } from '../../utils/constants';
import {
    saveSearchReqSavedMoviesLocal,
    getSearchReqSavedMoviesLocal,
    saveSavedCardsLocal,
    getSavedCardsLocal,
} from '../../utils/functionsLocalStorage';


function SavedMovies({ loggedIn }) {

    // additional states
    const [infoMessage, setInfoMessage] = useState({
        message: '',
        type: '',
    });

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

    return (
        <MoviesPage
            loggedIn={loggedIn}
            page='saved-movies'
            getSearchInputsLocal={getSearchReqSavedMoviesLocal}
            saveSearchInputsLocal={saveSearchReqSavedMoviesLocal}
            getLocalAllCards={getSavedCardsLocal}
            getAllCards={getSavedMovies}
        />
    );

}

export default SavedMovies;
