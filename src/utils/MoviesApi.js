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
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(this._checkResponse)
        .then((res) => {
          let cards = res.map(card => {
            return {...card, 
              image: (`${this._baseUrl}${card.image.url}`),
              thumbnail: (`${this._baseUrl}${card.image.formats.thumbnail.url}`),
              movieId: card.id
            };
          });
          return cards;
        })
    }
    
  }
  
  // MOVIES API
  const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    }
  });
  
  export default MoviesApi;