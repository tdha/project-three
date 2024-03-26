import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getUser } from '../../utilities/users-services';

import './App.css';

import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';

import NavBar from '../../components/NavBar/NavBar';
import FilteredPage from '../FilteredPage/FilteredPage';

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
                  <HomePage search={search} sendInformation={sendInformation} />
                </div>
              }
            />
            <Route
              path="/filter"
              element={
                <div className="center-searchPage">
                  <FilteredPage search={search} sendInformation={sendInformation} />
                </div>
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
