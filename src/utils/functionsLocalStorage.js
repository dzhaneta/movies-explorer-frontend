// local save & read handlers
export function saveSearchReqMoviesLocal(values) {
    const prevValues = getSearchReqMoviesLocal() || {};

    localStorage.setItem(
        'moviesSearchValues',
        JSON.stringify({ ...prevValues, ...values })
    );
}

export function getSearchReqMoviesLocal() {
    return JSON.parse(localStorage.getItem('moviesSearchValues')) || {
        text: '',
        isChecked: false,
    };
}

export function saveSearchReqSavedMoviesLocal(values) {
    const prevValues = getSearchReqSavedMoviesLocal() || {};

    localStorage.setItem(
        'savedMoviesSearchValues',
        JSON.stringify({ ...prevValues, ...values })
    );
}

export function getSearchReqSavedMoviesLocal() {
    return JSON.parse(localStorage.getItem('savedMoviesSearchValues')) || {
        text: '',
        isChecked: false,
    };
}

export function saveAllCardsLocal(cards) {
    localStorage.setItem('movies-all', JSON.stringify(cards));
}

export function getAllCardsLocal() {
    return JSON.parse(localStorage.getItem('movies-all'));
}

export function saveSavedCardsLocal(cards) {
    localStorage.setItem('saved-movies', JSON.stringify(cards));
}

export function getSavedCardsLocal() {
    return JSON.parse(localStorage.getItem('saved-movies'));
}

export function saveFilteredByDuration(cards) {
    localStorage.setItem('movies-found-by-duration', JSON.stringify(cards));
}

export function getFilteredByDuration() {
    return JSON.parse(localStorage.getItem('movies-found-by-duration'));
}

export function saveRenderedCardsQty(qty) {
    localStorage.setItem('rendered-cards-qty', JSON.stringify(qty));
}

export function getRenderedCardsQty() {
    return JSON.parse(localStorage.getItem('rendered-cards-qty'));
}