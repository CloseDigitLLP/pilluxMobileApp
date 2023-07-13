import { api } from '../../config/constants'
import * as actionTypes from './actionTypes'
import * as urls from '../../config/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const login = (email, password) => async (dispatch) => {

    dispatch({ type: actionTypes.LOGIN })

    try{

        const postData = {
            email,
            password
        }


        let response = await api(urls.login(), 'post', postData)

        if(response?.data?.error){ return Promise.reject(dispatch({ type: actionTypes.LOGIN_FAILED, payload: response?.data })) }

        return Promise.resolve(dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: response?.data }))

    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.LOGIN_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const logout = () => async (dispatch) => {
    console.log('here')
    await AsyncStorage.clear();
    dispatch({ type: actionTypes.LOGOUT })
}