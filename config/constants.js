import axios from "axios";
import { baseUrl } from "./urls";
import { store } from "../services/store";
import { logout } from "../services/Auth/actions";

const Axios = axios.create({
    baseURL: baseUrl,
})

export const api = async(url, type, data, headers={}, options={}) => {
    let requestTypes = ['get', 'post', 'put', 'delete'] 
    let requestType = requestTypes.find((reqType) => { return reqType === type })
    let reqHeaders = headers;
    let storage = store.getState();
    let accessToken = storage?.authReducer?.data?.data?.accessToken
    if (accessToken) {
        reqHeaders['authorization'] = `Bearer ${accessToken}`
    }
    if(requestType) {
        try {
            const response = await Axios({method: requestType, url: url, data: data, headers: reqHeaders, ...options})
            return response
        } catch (error) {
            console.log(error)
            if(error?.response?.status === 401){
                await logout()(store.dispatch)
            }
            return Promise.reject(error)
        }
    }else {
        return Promise.reject("invalid request type")
    }
}