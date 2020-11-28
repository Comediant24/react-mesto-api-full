import { BASE_URL, configHeaders } from './utils';

class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._handleResponse(res));
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(formData, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  addCard(formData, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  removeCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._handleResponse(res));
  }

  changeAvatar(formData, token) {
    return fetch(`${this._url}/users/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: formData.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(id, like, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._handleResponse(res));
  }
}

const api = new Api(configHeaders);
export default api;
