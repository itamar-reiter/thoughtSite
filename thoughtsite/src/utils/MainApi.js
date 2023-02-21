import { apiData } from "./constants";

class MainApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  checkToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  getInitialAppInfo(token) {
    return Promise.all([this.getUserInfo(token), this.getPosts(token)]);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }

  getPosts(token) {
    return fetch(`${this._baseUrl}/posts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }

  savePost(data, token) {
    const {
     keyword, title, text, date, source, link, image,
    } = data;
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  deletePost(cardId, token) {
    return fetch(`${this._baseUrl}/articles/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }
}

export default new MainApi(apiData);
