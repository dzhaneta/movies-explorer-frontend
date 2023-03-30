import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, type }) {

    return (
        <div className="movies-card-list">
            {cards.map(item => (
                <div className="movies-card-list__item" key={item.id}>
                    <MoviesCard key={item.id} movie={item} type={type} />
                </div>
            ))}
        </div>
    );
}

export default MoviesCardList;
