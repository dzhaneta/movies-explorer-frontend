import unlikedIcon from '../../images/icon_unliked.svg';
import likedIcon from '../../images/icon_liked.svg';
import deleteIconActive from '../../images/icon_delete_active.svg';
import deleteIconInactive from '../../images/icon_delete.svg';
import { getMovieDuration } from '../../utils/functionsMovies';
import { useState } from 'react';

function MoviesCard({ movie, type, onCardLike, onCardDelete }) {

    const { nameRU, image, duration, trailerLink, isLiked } = movie;
    const [isButtonHovered, setButtonHovered] = useState(false);

    function handleLikeClick() {
        onCardLike(movie);
    }

    function handleDeleteCard() {
        onCardDelete(movie);
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
                    src={image}
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
                        onClick={handleLikeClick}
                    >
                        <img 
                            src={isLiked? likedIcon : unlikedIcon} 
                            alt="like-icon" 
                            className={isLiked 
                                ? "movies-card__like-icon icon_liked"
                                : "movies-card__like-icon"} 
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
                        onMouseEnter={() => setButtonHovered(true)} 
                        onMouseLeave={() => setButtonHovered(false)}
                    >
                        <img 
                            src={isButtonHovered? deleteIconActive : deleteIconInactive} 
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