import { api } from '../../config/constants'
import { penalties, planning, repairs, student, vehicle } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const getPenaltyTypes = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_PENALTY_TYPES })
        let response = await api(penalties('types'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_PENALTY_TYPES_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_PENALTY_TYPES_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getPenalties = (id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_PENALTIES })
        let response = await api(penalties(`vehicle/${id}`), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_PENALTIES_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_PENALTIES_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const createPenalty = (data, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.CREATE_PENALTY })
        let response = await api(penalties(), 'post', data, headers, options)
        return Promise.resolve(
            dispatch({
                type: actionTypes.CREATE_PENALTY_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.CREATE_PENALTY_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const updatePenalty = (data, id, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.UPDATE_PENALTY })
        let response = await api(penalties(id), 'put', data, headers, options)
        return Promise.resolve(
            dispatch({
                type: actionTypes.UPDATE_PENALTY_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        return Promise.reject(dispatch({ type: actionTypes.UPDATE_PENALTY_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}