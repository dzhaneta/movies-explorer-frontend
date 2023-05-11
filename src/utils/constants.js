export const messages = {
  moviesNoResult: 'Ничего не найдено',
  moviesApiError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  moviesBeforeSearch: 'Здесь можно найти фильмы из архива Beat Film Festival. Введите ключевое слово и запускайте поиск.',
  userUpdateSuccess: 'Новые данные успешно сохранены',
};

export const regexes = {
  name: '[- А-Яа-яA-Za-zё]+$',
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
};

export const galleryPoints = [
  {
    width: 910,
    set: 16,
    add: 4,
  },
  {
    width: 768,
    set: 8,
    add: 2,
  },
  {
    width: 320,
    set: 5,
    add: 1,
  },
]