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
import { messages } from '../../utils/constants';

function App() {

  const history = useHistory();

  // user states
  const [isAuthCheckFinished, setIsAuthCheckFinished] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // api errors states
  const [infoMessage, setinfoMessage] = useState({
    message: '',
    type: '',
  });

  // already logged-in checkup
  useEffect(() => {
    MainApi
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setinfoMessage({
          message: err.message,
          type: 'error',
        });
      })
      .finally(() => {
        setIsAuthCheckFinished(true);
      });
  }, []);  

  // user info setup

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    MainApi
      .getUserInfo()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        setinfoMessage({
          message: err.message,
          type: 'error',
        });
      });
  }, [loggedIn]);

  // do not render until authorization checkup is finished
  if (!isAuthCheckFinished) {
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
        setinfoMessage({
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
        setinfoMessage({
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
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        setinfoMessage({
          message: err.message,
          type: 'error',
        });
      });
  }


  // profile handlers 
  function handleEditUser() {
    setIsEditing(true);
  }

  function handleUpdateUser(data) {
    MainApi
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setinfoMessage({
          message: messages.userUpdateSuccess,
          type: 'info',
        });
        setIsEditing(false);
      })
      .catch((err) => {
        setinfoMessage({
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
              infoMessage={infoMessage}
              setinfoMessage={setinfoMessage}
              component={Profile}
              isEditing={isEditing}
              onEditUser={handleEditUser}
              onUpdateUser={handleUpdateUser}
            />

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                infoMessage={infoMessage}
                setinfoMessage={setinfoMessage}
              />
            </Route>

            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                infoMessage={infoMessage}
                setinfoMessage={setinfoMessage}
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
