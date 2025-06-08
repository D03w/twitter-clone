import { toast } from "react-toastify"
import { BASE_CONFIG } from "../BaseConfig"

export const AutoGet = async (api) => {
    try{
        const res = await BASE_CONFIG.doGet(api)

        if(res.data.success){
            return res.data.data
        }else{
            toast.error(res.message)
        }

    }catch(err){}
}

export const AutoPost = async (api, data) => {
    try{
        const res = await BASE_CONFIG.doPost(api, data)
        console.log(res)

       return res.data
    }catch(err){
        toast.error(err.message)
    }
}

export const AutoPut = async (api, id, data) => {
    try{
        const res = await BASE_CONFIG.doPut(api, id, data)

        return res.data
    }catch(err){
        toast.error(err.message)
    }
}