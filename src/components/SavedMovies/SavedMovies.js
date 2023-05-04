import React from "react";
import MainApi from "../../utils/MainApi";
import MoviesPage from "../MoviesPage/MoviesPage";
import {
    saveSearchReqSavedMoviesLocal,
    getSearchReqSavedMoviesLocal,
    saveSavedCardsLocal,
    getSavedCardsLocal,
} from '../../utils/functionsLocalStorage';


function SavedMovies({ loggedIn }) {

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
