import MoviesApi from "./MoviesApi";
import MainApi from "./MainApi";
import {
  saveAllCardsLocal,
  getAllCardsLocal,
  saveSavedCardsLocal,
  getSavedCardsLocal,
  saveFilteredByDuration,
} from './functionsLocalStorage';

export function getMovieDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;

  let result = '';

  if (hours) {
      result += `${hours}ч `;
  }

  if (minutes) {
      result += `${minutes}м`;
  }

  return result;
}

export function filterByText(text, data) {
  if (
      typeof text === 'string' &&
      typeof data === 'object' &&
      data !== null &&
      data !== undefined &&
      data.length > 0
  ) {
      const word = text.toLowerCase();
      const result = data.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(word) ||
          movie.nameEN.toLowerCase().includes(word) ||
          movie.description.toLowerCase().includes(word) ||
          movie.country.toLowerCase().includes(word) ||
          movie.director.toLowerCase().includes(word) ||
          movie.year.toLowerCase().includes(word)
      );
      return result;
  } else return null;
}

export function filterByDuration(filter, data) {
  if (
    typeof filter === 'boolean' &&
    typeof data === 'object' &&
    data !== null &&
    data !== undefined &&
    data.length > 0
  ) {
    const result = data.filter((movie) =>
      filter ? movie.duration <= 40 : movie
    );
    return result;
  } else return null;
}

// get all movies
export function getAllMovies() {
  const localCards = getAllCardsLocal() || [];

  if (localCards.length === 0) {
    return MoviesApi
      .getCards()
        .then((data) => {
          saveAllCardsLocal(data);
          return data;
        })
  }

  return Promise.resolve(localCards);
}

// get saved movies
export function getSavedMovies() {
  const savedCards = getSavedCardsLocal() || [];
      
  if (savedCards.length === 0) {
    return MainApi
      .getCards()
        .then((data) => {
          data.forEach(card => card.isLiked = true);
          saveSavedCardsLocal(data);
          return data;
        })
  }
      
  return Promise.resolve(savedCards);
}

// filter movies 
export function filterMovies(data, values) {
  // filter by text
  let filteredByText = [];
  if (values.text !== '') {
    filteredByText = filterByText(values.text, data) || [];
  }
  
  // filter by checkbox
  const filteredByDuration = filterByDuration(
    values.isChecked,
    filteredByText
  ) || [];
  saveFilteredByDuration(filteredByDuration);
  
  return filteredByDuration;
}

// get all cards with up-to-date likes
export function getAllMoviesWithLikes() {
  return Promise.all([ getAllMovies(), getSavedMovies()])
    .then(([ allCards, savedCards]) => {
        allCards.forEach(card => {
          card.isLiked = savedCards?.some(
            saved => saved.movieId === card.movieId
          )
          ?? false;
        });

      saveAllCardsLocal(allCards);
      return [allCards, savedCards];
    })
}
