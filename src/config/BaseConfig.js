import axios from "axios"

export const BASE_URL = "http://localhost:3000/api/v1/"

export const APP_API = {
    auth: 'auth',
    login: 'auth/login',
    getMe: 'auth/get-me',
    post: 'post',
    userPost: 'post/user-post',
    like: 'like',
    notification: 'notification',
    comment: 'comment',
    follow: 'follow',
    answer: 'answer'
}

export const configs = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
}



export const BASE_CONFIG = {
    doGet: async (api) => {
        return await axios.get(`${BASE_URL}${api}`, configs)
    },
    doPost: async (api, data) => {
        return await axios.post(`${BASE_URL}${api}`, data, configs)
    },
    doPut: async (api, id, data) => {
        return await axios.put(`${BASE_URL}${api}/${id}`, data, configs)
    },
    doDelete: async (api, id) => {
        return await axios.delete(`${BASE_URL}${api}/${id}`)
    }
}