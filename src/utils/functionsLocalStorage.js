    // local save & read handlers
    export function saveSearchInputsLocal(values) {
        const prevValues = getSearchInputsLocal() || {};

        localStorage.setItem(
            'moviesSearchValues',
            JSON.stringify({ ...prevValues, ...values })
        );
    }

    export function getSearchInputsLocal() {
        return JSON.parse(localStorage.getItem('moviesSearchValues'));
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

    export function deleteFromSavedCardsLocal(card) {
        let prev = getSavedCardsLocal();
        const current = prev.filter(item => item.id !== card.id);
        saveSavedCardsLocal(current);
    }

    export function saveResultCardsLocal(cards) {
        localStorage.setItem('movies-result', JSON.stringify(cards));
    }

    export function getResultCardsLocal() {
        return JSON.parse(localStorage.getItem('movies-result'));
    }
