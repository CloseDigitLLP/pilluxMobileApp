import { api } from '../../config/constants'
import * as actionTypes from './actionTypes'
import * as urls from '../../config/urls'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistor } from '../store'


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
        return Promise.reject(dispatch({ type: actionTypes.LOGIN_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const verifyEmail = (email) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.VERIFY_EMAIL })

        let response = await api(urls.verify('email'), 'post', email)

        if(response?.data?.error){ return Promise.reject(dispatch({ type: actionTypes.VERIFY_EMAIL_FAILED, payload: response?.data })) }

        return Promise.resolve(dispatch({ type: actionTypes.VERIFY_EMAIL_SUCCESS, payload: response?.data }))

    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.VERIFY_EMAIL_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const verifyOtp = (data) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.VERIFY_OTP })

        let response = await api(urls.verify('otp'), 'post', data)

        if(response?.data?.error){ return Promise.reject(dispatch({ type: actionTypes.VERIFY_OTP_FAILED, payload: response?.data })) }

        return Promise.resolve(dispatch({ type: actionTypes.VERIFY_OTP_SUCCESS, payload: response?.data?.data }))

    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.VERIFY_OTP_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const savePassword = (data) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.SAVE_PASSWORD })
        let response = await api(urls.auth('save/password'), 'post', data)
        if(response?.data?.error){ return Promise.reject(dispatch({ type: actionTypes.SAVE_PASSWORD_FAILED, payload: response?.data })) }
        return Promise.resolve(dispatch({ type: actionTypes.SAVE_PASSWORD_SUCCESS, payload: response?.data?.data }))
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.SAVE_PASSWORD_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const changePassword = (data) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.CHANGE_PASSWORD })
        let response = await api(urls.auth('change/password'), 'post', data)
        if(response?.data?.error){ return Promise.reject(dispatch({ type: actionTypes.CHANGE_PASSWORD_FAILED, payload: response?.data })) }
        return Promise.resolve(dispatch({ type: actionTypes.CHANGE_PASSWORD_SUCCESS, payload: response?.data }))
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.CHANGE_PASSWORD_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const updateProfile = (data, id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.UPDATE_PROFILE })
        let response = await api(urls.users(id), 'put', data)
        return Promise.resolve(
            dispatch({
                type: actionTypes.UPDATE_PROFILE_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.UPDATE_PROFILE_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const logout = () => async (dispatch) => {
    await AsyncStorage.clear();
    await persistor.purge()
    dispatch({ type: actionTypes.LOGOUT })
}