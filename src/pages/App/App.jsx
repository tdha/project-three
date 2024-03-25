import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getUser } from '../../utilities/users-services';

import './App.css';

import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import HomePage from '../HomePage/HomePage';
import SearchLocationPage from '../SearchLocationPage/SearchLocationPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage'; // Ensure this is imported

import NavBar from '../../components/NavBar/NavBar';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/search" element={<SearchLocationPage />} /> {/* Adjusted route */}
            <Route path="/results" element={<SearchResultsPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
