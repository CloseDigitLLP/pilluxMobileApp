import axios from "axios";
import { baseUrl } from "./urls";

const Axios = axios.create({
    baseURL: baseUrl,
})

export const api = async(url, type, data, headers, options={}) => {
    let requestTypes = ['get', 'post', 'put', 'delete'] 
    let requestType = requestTypes.find((reqType) => { return reqType === type })

    if(requestType) {
        try {
            const response = await Axios({method: requestType, url: url, data: data, headers: headers, ...options})
            return response
        } catch (error) {
            console.log(error)
            return Promise.reject(error)            
        }
    }else {
        return Promise.reject("invalid request type")
    }
}