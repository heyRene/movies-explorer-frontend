
export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers, }).then(
      (res) => this._checkResponse(res)
    );
  }

  updateProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, { headers: this._headers, }).then(
      (res) => this._checkResponse(res)
    );
  }

  saveMovie({    
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    id,}) {
      console.log(image.url);
    return fetch(`${this._url}/movies`, {
      method: "POST",
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co/${image.url}`,
        trailerLink: trailerLink,
        thumbnail: `https://api.nomoreparties.co/beatfilm-movies${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
      }),
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

