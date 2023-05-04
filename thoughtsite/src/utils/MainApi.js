import { apiData } from "./constants";

class MainApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  register(email, password, name) {
    console.log('registering');
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  login(email, password) {
    console.log('logging in');
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
    console.log('checking token');
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
    console.log('getting initial app info');
    return Promise.all([this.getUserInfo(token), this.getPosts(token)]);
  }

  getUserInfo(token) {
    console.log('getting user info');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  getUsers(token, name) {
    console.log('getting users');
    return fetch(`${this._baseUrl}/users/${name}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => this._checkResponse(res));
  }

  joinToFollowers(token, friendId) {
    console.log('joining to followers');
    return fetch(`${this._baseUrl}/users/${friendId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }

  handleFriendsList(token, friendsIds, method) {
    console.log('handling friends list');
    return fetch(`${this._baseUrl}/users/me/friends`, {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        friendsIds,
      }),
    })
      .then((res) => this._checkResponse(res));
  }



  getPosts(token) {
    console.log('getting posts');
    return fetch(`${this._baseUrl}/posts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      });
  }

  createPost(input, token) {
    console.log('creating post');
    return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  addComment(input, postId, token) {
    console.log('adding comment');
    return fetch(`${this._baseUrl}/posts/${postId}/comments`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input,
      })
    })
      .then((res) => this._checkResponse(res));
  }

  putLike(postId, token) {
    console.log('putting like');
    return fetch(`${this._baseUrl}/posts/${postId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }

  removeLike(postId, token) {
    console.log('removing like');
    return fetch(`${this._baseUrl}/posts/${postId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }


  deletePost(postId, token) {
    console.log('deleting post');
    return fetch(`${this._baseUrl}/articles/${postId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
      .then((res) => this._checkResponse(res));
  }
}

const mainApi = new MainApi(apiData);

export default mainApi;
