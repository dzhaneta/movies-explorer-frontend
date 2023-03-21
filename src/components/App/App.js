import React, { useState } from 'react'; 
import { Route, Switch } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';

function App() {
  const loggedIn = useState(false);

  return (
    <div className="page">
      <div className="page__container">

        <Switch>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/signup">
            <Register />
         </Route>

          <LoggedInContext.Provider value={loggedIn}>

            <Route path="/movies">
              <Movies />
            </Route>

            <Route path="/saved-movies">
              <SavedMovies />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route exact path="/">
              <Main />
            </Route>

          </LoggedInContext.Provider>

        </Switch>

      </div>

    </div>
  );
}

export default App;
