import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, userEmail, onClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="Логотип сайта" className="header__logo" />
      </Link>
      <ul className="header__nav">
        <Route exact path="/">
          <li className="header__nav-item">
            <p className="header__user-email">{userEmail}</p>
          </li>
          <li className="header__nav-item">
            <button
              onClick={onClick}
              className="link header__link button header__button header__button_signOut"
            >
              Выход
            </button>
          </li>
        </Route>
        <Route path="/sign-in">
          <li className="header__nav-item">
            <Link
              to="/sign-up"
              className="link header__link header__link_sign-up"
            >
              Регистрация
            </Link>
          </li>
        </Route>
        <Route path="/sign-up">
          <li className="header__nav-item">
            <Link
              to="/sign-in"
              className="link header__link header__link_sign-in"
            >
              Вход
            </Link>
          </li>
        </Route>
      </ul>
    </header>
  );
}

export default Header;
