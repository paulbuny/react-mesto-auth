class Auth {
    constructor(url) {
        this.url = url;
    }

    _getResponseStatus (res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    signUp (email, password) {
        return fetch (`${this.url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._getResponseStatus(res));
    }

    signIn (email, password) {
        return fetch (`${this.url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._getResponseStatus(res));
    }

    getToken (jwt) {
        return fetch (`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        }).then((res) => this._getResponseStatus(res));
    }
}

const auth = new Auth('https://auth.nomoreparties.co');

export default auth;