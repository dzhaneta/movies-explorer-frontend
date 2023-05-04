import React, { useState } from "react";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import MoviesPage from "../MoviesPage/MoviesPage";
import { messages } from '../../utils/constants';
import {
    saveSearchReqMoviesLocal,
    getSearchReqMoviesLocal,
    saveAllCardsLocal,
    getAllCardsLocal,
    saveSavedCardsLocal,
    getSavedCardsLocal,
} from '../../utils/functionsLocalStorage';

function Movies({ loggedIn }) {
    
    // additional states
    const [infoMessage, setInfoMessage] = useState({
        message: '',
        type: '',
    });

    // get all movies
    function getAllMovies() {
        const localCards = getAllCardsLocal();

        if (!localCards) {
            return MoviesApi
                .getCards()
                .then((data) => {
                    saveAllCardsLocal(data);
                    return data;
                })
                .catch(() => {
                    setInfoMessage({
                        message: messages.moviesApiError,
                        type: 'error',
                    });
                });
        }

        return Promise.resolve(localCards);
    }

    // get saved movies
    function getSavedMovies() {
        const savedCards = getSavedCardsLocal() || [];
        
        
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

    // get all cards with up-to-date likes
    function getAllMoviesWithLikes() {

        return Promise.all([ getAllMovies(), getSavedMovies()])
            .then(([ allCards, savedCards]) => {
                allCards.forEach(card => {
                    card.isLiked = savedCards?.some(
                            saved => saved.movieId === card.movieId
                        )
                        ?? false;
                });

                saveAllCardsLocal(allCards);
                return allCards;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <MoviesPage
            loggedIn={loggedIn}
            page='movies'
            getSearchInputsLocal={getSearchReqMoviesLocal}
            saveSearchInputsLocal={saveSearchReqMoviesLocal}
            getLocalAllCards={getAllCardsLocal}
            getAllCards={getAllMoviesWithLikes}
        />
    );

}

export default Movies;