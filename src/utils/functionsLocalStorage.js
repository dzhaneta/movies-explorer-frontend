    // local save & read handlers
    export function saveSearchInputsLocal(values) {
        const prevValues = getSearchInputsLocal() || {};

        localStorage.setItem(
            'moviesSearchValues',
            JSON.stringify({ ...prevValues, ...values })
        );
    }

    export function getSearchInputsLocal() {
        return JSON.parse(localStorage.getItem('moviesSearchValues')) || {
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

    export function addSavedCardsLocal(card) {
        let prev = getSavedCardsLocal();
        prev = [...prev, card];
        saveSavedCardsLocal(prev);
    }

    export function deleteFromSavedCardsLocal(cardId) {
        let prev = getSavedCardsLocal();
        const current = prev.filter(item => item._id !== cardId);
        saveSavedCardsLocal(current);
    }

    export function saveFilteredByText(cards) {
        localStorage.setItem('movies-found-by-text', JSON.stringify(cards));
    }

    export function getFilteredByText() {
        return JSON.parse(localStorage.getItem('movies-found-by-text'));
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