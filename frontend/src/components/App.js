import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import Register from './Register';
import Login from './Login';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [isDeleteReqPopupOpen, setIsDeleteReqPopupOpen] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isDataSending, setDataSending] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipTypeSuccess, setIsInfoTooltipTypeSuccess] = useState(
    false
  );
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');
  const history = useHistory();

  useEffect(() => {
    setIsCardsLoading(true);
    Promise.all([api.getInitialCards(token), api.getUserInfo(token)])
      .then(([cardElements, user]) => {
        setCards(cardElements);
        setCurrentUser(user);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsCardsLoading(false));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        console.log(newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  }

  function handleCardDeleteRequest(card) {
    setCardDelete(card);
    setIsDeleteReqPopupOpen(true);
  }

  function handleCardDelete(e) {
    setDataSending(true);
    e.preventDefault();
    api
      .removeCard(cardDelete._id, token)
      .then(() => {
        const newCards = cards.filter((c) => c !== cardDelete);
        setCards(newCards);
      })
      .then(() => setIsDeleteReqPopupOpen(false))
      .catch((err) => console.error(err))
      .finally(() => setDataSending(false));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card, isOpen: true });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeleteReqPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(user) {
    setDataSending(true);
    api
      .setUserInfo(user, token)
      .then((update) => setCurrentUser(update))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
      .finally(() => setDataSending(false));
  }

  function handleUpdateAvatar(avatar) {
    setDataSending(true);
    api
      .changeAvatar(avatar, token)
      .then((update) => setCurrentUser(update))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
      .finally(() => setDataSending(false));
  }

  function handleAddPlaceSubmit(card) {
    setDataSending(true);
    api
      .addCard(card, token)
      .then((update) => setCards([update, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
      .finally(() => setDataSending(false));
  }

  useEffect(() => {
    function escFunction(e) {
      if (e.keyCode === 27) closeAllPopups();
    }
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, []);

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          setInfoTooltipMessage('Вы успешно зарегистрировались!');
          setIsInfoTooltipPopupOpen(true);
          setIsInfoTooltipTypeSuccess(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipTypeSuccess(false);
        if (err === 400)
          return console.log('Ошибка: некорректно заполнено одно из полей');
        console.log(err);
      });
  }

  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          setUserEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setInfoTooltipMessage('Неверный логин или пароль! Попробуйте ещё раз.');
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipTypeSuccess(false);
        if (err === 400) return console.log('не передано одно из полей');
        if (err === 401) return console.log('Неверный логин или пароль');
        console.log(err);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      auth
        .getContent(token)
        .then((userData) => {
          setLoggedIn(true);
          setUserEmail(userData.email);
          history.push('/');
        })
        .catch((err) => {
          if (err === 400)
            return console.log('Токен не передан или передан не в том формате');
          if (err === 401) return console.log('Переданный токен некорректен');
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onClick={onSignOut}
          />
          <main className="content">
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteRequest}
                  isCardsLoading={isCardsLoading}
                />
              </ProtectedRoute>
              <Route path="/sign-up">
                <Register onRegister={onRegister} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={onLogin} />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
          </main>
          <Footer />

          <InfoTooltip
            message={infoTooltipMessage}
            isSuccess={isInfoTooltipTypeSuccess}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />

          <EditAvatarPopup
            isSending={isDataSending}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isSending={isDataSending}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isSending={isDataSending}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm
            isEnabled="true"
            name="card-delete"
            title="Вы уверены?"
            isOpen={isDeleteReqPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            buttonText={isDataSending ? 'Удаление...' : 'Да'}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
