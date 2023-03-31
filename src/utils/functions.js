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

export function filterByRequest(request, data) {
    if (
        typeof request === 'string' &&
        typeof data === 'object' &&
        data.length > 0
    ) {
        const word = request.toLowerCase();
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
      data.length > 0
    ) {
      const result = data.filter((movie) =>
        filter ? movie.duration <= 40 : movie.duration > 40
      );
      return result;
    } else return null;
}