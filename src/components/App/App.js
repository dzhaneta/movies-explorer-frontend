import React, { useEffect, useState } from 'react'; 
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import { currentUserContext } from '../../contexts/currentUserContex';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';

function App() {

  const history = useHistory();

  // user states
  const [isAuthed, setIsAuthed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // api errors states
  const [apiErrorMessage, setApiErrorMessage] = useState({
    message: '',
    type: '',
  });

  // already logged-in checkup
  useEffect(() => {
    console.log('работает проверка токена');
    MainApi
      .checkToken()
      .then((res) => {
        if (res) {
          setIsAuthed(true);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);  

  // set user info if logged-in

  useEffect(() => {
    console.log('работает установка текущего юзера');
    if (!loggedIn) {
      console.log('юзер не установлен');
      return;
    }

    MainApi
      .getUserInfo()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        }
        console.log('юзер установлен');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  if (!isAuthed) {
    return null;
  }

  // auth handlers

  function handleRegister(data) {
    MainApi
      .register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch((err) => {
        setApiErrorMessage({
          message: err.message,
          type: 'error',
        });
      });
  }

  function handleLogin(data) {
    MainApi
      .login(data)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        setApiErrorMessage({
          message: err.message,
          type: 'error',
        });
      });
  }

  function handleSignOut() {
    MainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        history.push("/");
      })
      .catch((err) => {
        setApiErrorMessage({
          message: err.message,
          type: 'error',
        });
      });
  }

  function handleUpdateUser(data) {
    MainApi
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        setApiErrorMessage({
          message: err.message,
          type: 'error',
        });
      });
  }

  return (
    <div className="page">
      <div className="page__container">

        <currentUserContext.Provider value={currentUser}>

          <Switch>

            <ProtectedRoute
              path="/movies"
              loggedIn={loggedIn}
              component={Movies}
            />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
            />

            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              apiErrorMessage={apiErrorMessage}
              setApiErrorMessage={setApiErrorMessage}
              component={Profile}
              onUpdateUser={handleUpdateUser}
            />

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                apiErrorMessage={apiErrorMessage}
                setApiErrorMessage={setApiErrorMessage}
              />
            </Route>

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                apiErrorMessage={apiErrorMessage}
                setApiErrorMessage={setApiErrorMessage}
              />
            </Route>

            <Route exact path="/">
              <Main loggedIn={loggedIn} />
            </Route>

            <Route path="*">
                <NotFound />
            </Route>

          </Switch>

        </currentUserContext.Provider>

      </div>
    </div>
  );
}

export default App;
