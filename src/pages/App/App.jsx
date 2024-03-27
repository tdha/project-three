import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getUser } from '../../utilities/users-services';

import './App.css';

import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';

import NavBar from '../../components/NavBar/NavBar';
import FavoritePage from '../FavoritePage/FavoritePage';

function App() {
  const [user, setUser] = useState(getUser());
  const [search, setSearch] = useState(false);

  const searchProperties = () => {
    setSearch(false);
  };

  const sendInformation = () => {
    setSearch(true);
  };

  return (
    <>
      <main className="App">
        {user ? (
          <>
            <NavBar
              user={user}
              setUser={setUser}
              searchProperties={searchProperties}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="center-searchPage">
                    <HomePage
                      search={search}
                      sendInformation={sendInformation}
                    />
                  </div>
                }
              />
              <Route
                path="/favorites"
                element={
                  <div>
                    <FavoritePage />
                  </div>
                }
              />
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </>
  );
}

export default App;
