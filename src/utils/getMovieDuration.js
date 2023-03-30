function getMovieDuration(duration) {
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

export default getMovieDuration;