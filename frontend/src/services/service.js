import CustomError from "./error";

const host = "http://127.0.0.1:8000/";

export default class PostAPIService {
    async checkToken(func, url, data = null) {
        if (parseInt(localStorage.getItem('refreshExp')) <= Math.ceil(Date.now() / 1000)) {
            throw new CustomError("Refresh expired")
        }
        if (parseInt(localStorage.getItem('accessExp')) <= Math.ceil(Date.now() / 1000)) {
            const response = await fetch(host + 'user/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
            });
            const res = await response.json();
            if (response.ok) {
                localStorage.setItem('accessToken', res.access);
                localStorage.setItem('refreshToken', res.refresh);
            } else {
                throw new CustomError(res.detail, response.status)
            }
        }
        if (data) {
            return await func(url, data)
        } else {
            return await func(url)
        }
    }

    async getItems(url) {
        const items = await fetch((host + url), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('accessToken')
                    ? `JWT ${localStorage.getItem('accessToken')}` : null
            }
        });
        const response = await items.json()
        if (!items.ok) {
            throw new CustomError(response.detail, items.status);
        }
        console.log(response);
        return response;
    }

    async postItem(url, data) {
        const item = await fetch(host + url, {
            method: "POST",
            headers: {
                Authorization: `JWT ${localStorage.getItem('accessToken')}`
            },
            body: data
        });
        console.log(item)
        const response = await item.json();
        console.log(item)
        if (!item.ok) {
            throw new CustomError(response.detail, item.status)
        }
        return response;

    }

    async putItem(url, data) {
        const item = await fetch((host + url), {
            method: "PUT",
            headers: {
                Authorization: `JWT ${localStorage.getItem('accessToken')}`
            },
            body: data
        });
        const response = await item.json();
        if (!item.ok) {
            throw new CustomError(response.detail, item.status)
        }
        return response;
    }

    async patchItem(url, data) {
        const item = await fetch((host + url), {
            method: "PATCH",
            headers: {
                Authorization: `JWT ${localStorage.getItem('accessToken')}`
            },
            body: data
        });
        const response = await item.json();
        if (!item.ok) {
            throw new CustomError(response.detail, item.status)
        }
        return response;
    }

    async deleteItem(url) {
        const item = await fetch((host + url), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('accessToken')}`
            }
        });
        if (!item.ok) {
            const response = await item.json();
            throw new CustomError(response.detail, item.status)
        }
        return item;
    }

    async signIn(data) {
        let item = await fetch((host + "user/sign_in/"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const response = await item.json();
        if (!item.ok) {
            throw new CustomError(response.detail, item.status)
        }
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        localStorage.setItem('username', response.username);
        localStorage.setItem('logged', 'true');
        localStorage.setItem('accessExp', `${Date.now() / 1000 + 300}`);
        localStorage.setItem('refreshExp', `${Date.now() / 1000 + 86400}`);
        return response;
    }

    async signUp(fields) {
        let item = await fetch((host + "user/sign_up/"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields)
        });
        const response = await item.json();
        if (!response.ok) {
            throw new CustomError(response.detail, response.status)
        }
        return response;
    }

    async logOut() {
        let res = await fetch(host + 'user/sign_out/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
        });
        console.log(res);
        if (!res) {
            const response = await res.json();
            throw CustomError(response.detail, res.status);
        }
        localStorage.clear();
        return res;
    }
}
