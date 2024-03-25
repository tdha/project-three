import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-services';

import { useState } from 'react';
import './NavBar.css';
import Hamburger from './Hamburger';

const NavBar = ({ user, setUser }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="../../assets/logo.png" alt="" />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            {<Hamburger />}
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>Hello, {user.name}</li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/search">Search Location</Link>
              </li>
              <li>
                <Link to="/results">Search Results</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogOut}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
