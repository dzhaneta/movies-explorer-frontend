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
      return Promise.reject(`Ошибка: ${res.status}`);
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
  
    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        })
        .then(this._checkResponse)
    }

    // Login
  
    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
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
  
    setUserInfo(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
      .then(this._checkResponse)
    }
    
    // Get cards from API
  
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: this._headers,
          credentials: 'include',
        })
        .then(this._checkResponse)
    }
    
    // Save card
  
    saveCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkResponse)
    }
  
  
    // Delete card
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse)
    }
  
    // card like-dislike
    
    changeLikeCardStatus(id, status) {
      let method = status? 'PUT' : 'DELETE'
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: method,
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse);
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