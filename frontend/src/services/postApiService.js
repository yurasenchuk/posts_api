import CustomError from "./error";
import UserService from "./userService";

const host = "http://127.0.0.1:8000/";

export default class PostAPIService {

    async checkCredentials(credentials) {
        if (parseInt(credentials.exp) <= Math.ceil(Date.now() / 1000)) {
            const userService = new UserService();
            await userService.refresh();
        }
        return {Authorization: `JWT ${localStorage.getItem('accessToken')}`};
    }

    async getItems(url, credentials = null) {
        const authorization = credentials ? await this.checkCredentials(credentials) : null;
        return await fetch(host + url, {
            method: "GET",
            headers: {
                ...authorization,
                'Content-Type': 'application/json',
            }
        }).then(await this.handleResponse)
    }

    async postItem(url, data, credentials = null) {
        const authorization = credentials ? await this.checkCredentials(credentials) : null;
        return  await fetch(host + url, {
            method: "POST",
            headers: {
                ...authorization
            },
            body: data
        }).then(await this.handleResponse)
    }


    async putItem(url, data, credentials = null) {
        const authorization = credentials ? await this.checkCredentials(credentials) : null;
        return await fetch(host + url, {
            method: "PUT",
            headers: {
                ...authorization
            },
            body: data
        }).then(await this.handleResponse)
    }


    async patchItem(url, data, credentials = null) {
        const authorization = credentials ? await this.checkCredentials(credentials) : null;
        return await fetch(host + url, {
            method: "PATCH",
            headers: {
                ...authorization
            },
            body: data
        }).then(await this.handleResponse)
    }


    async deleteItem(url, credentials = null) {
        const authorization = credentials ? await this.checkCredentials(credentials) : null;
        return await fetch(host + url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                ...authorization
            }
        })
    }

    async handleResponse(response) {
        if (!response.ok) {
            throw new CustomError(response.statusText, response.status)
        }
        return await response.json();
    }
}
