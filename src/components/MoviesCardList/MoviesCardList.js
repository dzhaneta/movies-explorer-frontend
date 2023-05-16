import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, type, onCardLike, onCardDelete }) {

    return (
        <div className="movies-card-list">
            {cards.map(item => (
                <div className="movies-card-list__item" key={item.movieId}>
                    <MoviesCard 
                        key={item.movieId}
                        movie={item}
                        type={type}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                </div>
            ))}
        </div>
        
    );
}

export default MoviesCardList;
