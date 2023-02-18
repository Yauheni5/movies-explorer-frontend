class MainApi {
  constructor(){
    this.url = 'http://api.diploma-yauheni.nomoredomainsclub.ru';
  }

  _checkResponseError = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this.url}/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(this._checkResponseError)
  }

  registrationUser (userRegistrationInfo){
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        email: userRegistrationInfo.email,
        password: userRegistrationInfo.password,
        name: userRegistrationInfo.name
      })
    })
    .then(this._checkResponseError)
  }

  authorizationUser (userRegistrationInfo) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        email: userRegistrationInfo.email,
        password: userRegistrationInfo.password
      })
    })
    .then(this._checkResponseError)
  }

  editUser (userEditData, token) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify(userEditData)
    })
    .then(this._checkResponseError)
  }

  checkUserToken (token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponseError)
  }

  saveMovie (dataMovie, token) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
    },
      body: JSON.stringify(dataMovie)
    })
    .then(this._checkResponseError)
  }

  getAllPromise(token) {
    return Promise.all([this.getUserInfo(token)])
  }
}

export const mainApi = new MainApi();
