import React, { useState } from 'react'; 
import { Route, Switch } from "react-router-dom";
import { LoggedInContext } from "../../contexts/LoggedInContext";
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';

function App() {

  const [ loggedIn ] = useState(true); // manual switcher

  const [user, setUser] = React.useState({
    name: 'Виталий',
    email: 'vitalyi@mail.ru',
  });

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
              <Profile 
                user={user}
                onSubmit={setUser}
              />
            </Route>

            <Route exact path="/">
              <Main />
            </Route>

          </LoggedInContext.Provider>

          <Route path="*">
              <NotFound />
          </Route>

        </Switch>

      </div>

    </div>
  );
}

export default App;
