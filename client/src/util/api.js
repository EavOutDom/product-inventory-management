import axios from "axios";

const APIURL = "http://localhost:8000";

export const api = {
    DOMAIN: APIURL + "api/",
    AUTH_DOMAIN: APIURL,
};

const post = async (url = "", body = {}, user = null) => {
    let headers = {};
    if (
        typeof window !== "undefined" &&
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== "undefined"
    ) {
        const { access_token } = JSON.parse(localStorage.getItem("user"));
        headers.Authorization = access_token;
    }
    try {
        const { data } = await axios.post(api.DOMAIN + url, body, { headers });
        return data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            window.localStorage.removeItem("user");
        }
        console.error("Error from api: ", err.message);
        throw err;
    }
};

const get = async (url = "", body, user = null) => {
    let headers = {};
    if (
        typeof window !== "undefined" &&
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== "undefined"
    ) {
        const { access_token } = JSON.parse(localStorage.getItem("user"));
        headers.Authorization = "Bear " + access_token;
    }
    try {
        const { data } = await axios.get(api.DOMAIN + url, body, { headers });
        return data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            window.localStorage.removeItem("user");
        }
        console.error("Error from api: ", err.message);
        throw err;
    }
};

const delete_api = async (url = "", body, user = null) => {
    let headers = {};
    if (
        typeof window !== "undefined" &&
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== "undefined"
    ) {
        const { access_token } = JSON.parse(localStorage.getItem("user"));
        headers.Authorization = access_token;
    }
    try {
        const { data } = await axios.delete(api.DOMAIN + url, body, {
            headers,
        });
        return data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            window.localStorage.removeItem("user");
        }
        console.error("Error from api: ", err.message);
        throw err;
    }
};

const put = async (url = "", body, user = null) => {
    let headers = {};
    if (
        typeof window !== "undefined" &&
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== "undefined"
    ) {
        const { access_token } = JSON.parse(localStorage.getItem("user"));
        headers.Authorization = access_token;
    }
    try {
        const { data } = await axios.put(api.DOMAIN + url, body, { headers });
        return data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            window.localStorage.removeItem("user");
        }
        console.error("Error from api: ", err.message);
        throw err;
    }
};

export const request = { post, get, delete_api };
