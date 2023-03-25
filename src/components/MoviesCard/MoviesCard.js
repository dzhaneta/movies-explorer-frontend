import { useState } from 'react';
import unlikedIcon from '../../images/icon_unliked.svg';
import likedIcon from '../../images/icon_liked.svg';
import deleteIcon from '../../images/icon_delete.svg';
import getMovieDuration from '../../utils/getMovieDuration';

function MoviesCard({ movie, type }) {

    const { image, duration, name } = movie;

    const [isLiked, setLiked] = useState(false);

    function handleLikeCard() {
        setLiked(!isLiked);
    }

    function handleDeleteCard() {
        setLiked(!isLiked);
    }

    return (
        <div className="movies-card">

            <img
                className="movies-card__image"
                src={image}
                alt="movies_image"
            />

            <div className="movies-card__info">

                <div className="movies-card__name">
                    {name}
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
