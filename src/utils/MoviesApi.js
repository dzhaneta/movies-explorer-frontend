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
    
    // Get cards from MOVIES API
  
    getCards() {
        return fetch(`${this._baseUrl}`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(this._checkResponse)
    }
    
  }
  
  // MOVIES API
  const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    }
  });
  
  export default MoviesApi;