class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
     // Check response from API
  
     _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((res) => Promise.reject(new Error(res.message)))
    }

    // Check token
  
    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._checkResponse)
    }

    // Register
  
    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            })
        })
        .then(this._checkResponse)
    }

    // Login
  
    login(data) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        })
        .then(this._checkResponse)
    }

    // Logout
  
    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._checkResponse)
    }
    
    // Get profile from API
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
    }
  
    // Save profile
  
    setUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      })
      .then(this._checkResponse)
    }
    
    // Get cards from API
  
    getCards() {
        return fetch(`${this._baseUrl}/movies`, {
          method: 'GET',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._checkResponse)
    }
    
    // Save card
  
    saveCard(movie) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
      })
      .then(this._checkResponse)
    }
  
  
    // Delete card
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
    }
}
  
  // API
  const MainApi = new Api({
    baseUrl: 'https://api.beatfilmlist.nomoredomains.work',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    }
  });
  
  export default MainApi;