import { useState } from 'react';
import unlikedIcon from '../../images/icon_unliked.svg';
import likedIcon from '../../images/icon_liked.svg';
import deleteIcon from '../../images/icon_delete.svg';
import { getMovieDuration } from '../../utils/functions';

function MoviesCard({ movie, type }) {

    const { nameRU, image, duration, trailerLink } = movie;
    const [isLiked, setLiked] = useState(false);
    const baseURL = 'https://api.nomoreparties.co';

    function handleLikeCard() {
        setLiked(!isLiked);
    }

    function handleDeleteCard() {
        setLiked(!isLiked);
    }

    return (
        <div className="movies-card">

            <a 
                href={trailerLink}
                className="movies-card__link"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="movies-card__image"
                    src={`${baseURL}${image.url}`}
                    alt={image.name}
                />
            </a>

            <div className="movies-card__info">

                <div className="movies-card__name">
                    {nameRU}
                </div>

                {type === 'movies' &&
                    <button
                        className="
                            movies-card__button 
                            movies-card__button_type_like
                        "
                        onClick={handleLikeCard}
                    >
                        <img 
                            src={isLiked? likedIcon : unlikedIcon} 
                            alt="like-icon" 
                            className="movies-card__like-icon"
                        />
                    </button>
                }

                {type === 'saved-movies' &&
                    <button
                        className="
                            movies-card__button 
                            movies-card__button_type_delete
                        "
                        onClick={handleDeleteCard}
                    >
                        <img 
                            src={deleteIcon} 
                            alt="delete-icon" 
                            className="movies-card__like-icon"
                        />
                    </button>
                }
                

            </div>

            <div className="movies-card__duration">
                {getMovieDuration(duration)}
            </div>

        </div>
    );
}

export default MoviesCard;
