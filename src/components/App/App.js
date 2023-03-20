import React, { useState } from 'react'; 
import { Route, Switch, useLocation } from "react-router-dom";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  const loggedIn = useState(true);

  const location = useLocation();

  const isHeaderVisible = (location.pathname === "/") ||
    (location.pathname === "/movies") ||
    (location.pathname === "/saved-movies") ||
    (location.pathname === "/profile");

  const isFooterVisible = (location.pathname === "/") ||
    (location.pathname === "/movies") ||
    (location.pathname === "/saved-movies");


  return (
    <div className="page">
      <div className="page__container">

        <header>{isHeaderVisible && <Header loggedIn={loggedIn} />}</header>

        <main>
          <Switch>

            <Route path="/signin">
              <Login />
            </Route>

            <Route path="/signup">
              <Register />
            </Route>

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

          </Switch>
        </main>

        {isFooterVisible && <Footer />}

      </div>

    </div>
  );
}

export default App;
