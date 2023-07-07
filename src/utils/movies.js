import {SHORT_FILM_DURATION} from './constants';
// localStorage

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Ошибка при сохранении в localStorage:", error);
  }
};

// Функция для получения значения из localStorage
export const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Ошибка при получении из localStorage:", error);
    return null;
  }
};

// вспомогательная функция которая сравнивает запрос и название фильма
export const filterMovies = (cards, query, short) => {
  if (!cards) {
    return [];
  }
  let filtered = [...cards];
  if(query){
  filtered = cards.filter((card) => 
   card.nameRU.toLowerCase().includes(query.toLowerCase()));
  }
  if(short) {
    console.log('short');
    return filtered.filter((card) => card.duration <= SHORT_FILM_DURATION);
  }
  return filtered;
}

export function filterSavedMovies(movies, userId) {
  const filtered = movies.filter((movie) => {
  return movie.owner === userId});
  return filtered;
}