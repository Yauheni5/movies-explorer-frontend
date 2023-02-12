class MoviesApi {
  constructor(){
    this.url = 'https://api.nomoreparties.co/beatfilm-movies';
  }
  _checkResponseError = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getMovies(){
    return fetch(`${this.url}/`)
    .then(this._checkResponseError)
  }
}

export const moviesApi = new MoviesApi();
