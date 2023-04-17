export const messages = {
  moviesNoResult: 'Ничего не найдено',
  moviesApiError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

export const regexes = {
  name: '[- А-Яа-яA-Za-zё]+$',
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
};

export const galleryPoints = [
  {
    width: 425,
    set: 5,
    add: 1,
  },
  {
    width: 768,
    set: 8,
    add: 2,
  },
  {
    width: 1024,
    set: 16,
    add: 4,
  },
]