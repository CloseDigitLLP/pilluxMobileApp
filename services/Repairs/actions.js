import { api } from '../../config/constants'
import { planning, repairs, student, vehicle } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const getRepairTypes = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_REPAIR_TYPES })
        let response = await api(repairs('types'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_REPAIR_TYPES_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_REPAIR_TYPES_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getRepairs = (id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_REPAIRS })
        let response = await api(repairs(`vehicle/${id}`), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_REPAIRS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_REPAIRS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const createRepair = (data, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.CREATE_REPAIR })
        let response = await api(repairs(), 'post', data, headers, options)
        return Promise.resolve(
            dispatch({
                type: actionTypes.CREATE_REPAIR_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.CREATE_REPAIR_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const updateRepair = (data, id, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.UPDATE_REPAIR })
        let response = await api(repairs(id), 'put', data, headers, options)
        return Promise.resolve(
            dispatch({
                type: actionTypes.UPDATE_REPAIR_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        return Promise.reject(dispatch({ type: actionTypes.UPDATE_REPAIR_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}