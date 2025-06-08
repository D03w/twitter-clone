import { toast } from "react-toastify"
import { APP_API, BASE_CONFIG } from "../BaseConfig"
import { data } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export const AuthRegister = async (api, data, location) => {
    try{
        const res = await BASE_CONFIG.doPost(api, data)
        console.log(res)

        if(res.data.success){
            localStorage.setItem('token', res.data.token)
            toast.success(res.data.message)
            return location('/home')
        }

        toast.error(res.data.message)
    }catch(err){
        toast.error(err.message)
    }
}

export const AuthLogin = async (api, data, location) => {
    try{
        const res = await BASE_CONFIG.doPost(api, data)

        if(res.data.success){
            localStorage.setItem('token', res.data.token)
            toast.success(res.data.message)
            return location('/home')
        }
    }catch(err){
        toast.error(err.message)
    }
}

export const getMe = async (setUser, location) => {
    try{
        const token = localStorage.getItem("token")

        if(!token){
            return location("/")
        }
        const decoded = jwtDecode(token)
        const res = await BASE_CONFIG.doGet(`${APP_API.getMe}/${decoded.id}`)

        if(!decoded.id && res.data.user){
            location('/')
        }else{
            setUser(res.data.user)
            return res.data.user
        }
    }catch(err){
        toast.error(err.message)
    }
}