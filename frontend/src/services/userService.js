import CustomError from "./error";

const host = "http://127.0.0.1:8000/";

export default class UserService {
    async signIn(data) {
        return await fetch(host + "user/sign_in/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(this.handleResponse)
            .then((response) => {
                localStorage.setItem('accessToken', response.access);
                localStorage.setItem('refreshToken', response.refresh);
            })
    }

    async signUp(fields) {
        return await fetch(host + "user/sign_up/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields)
        }).then(this.handleResponse)
    }

    async logOut() {
        return await fetch(host + 'user/sign_out/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
        }).then(() => {
                localStorage.clear();
                return Promise.resolve();
            })
    }


    async refresh() {
        return await fetch(host + 'user/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
        }).then(this.handleResponse)
            .then((response) => {
                localStorage.setItem('accessToken', response.access);
                localStorage.setItem('refreshToken', response.refresh);
            })
    }


    async handleResponse(response) {
        if (!response.ok) {
            const data = await response.json()
            throw new CustomError(Object.values(data)[0], response.status)
        }
        return await response.json();
    }
}