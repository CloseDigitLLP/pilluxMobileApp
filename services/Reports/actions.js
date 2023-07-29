import { api } from '../../config/constants'
import { planning, repairs, reports, student, vehicle } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const getReportTypes = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_REPORT_TYPES })
        let response = await api(reports('types'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_REPORT_TYPES_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_REPORT_TYPES_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getReports = (id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_REPORTS })
        let response = await api(reports(`vehicle/${id}`), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_REPORTS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_REPORTS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const createReport = (data, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.CREATE_REPORT })
        let response = await api(reports(), 'post', data, headers, options)
        console.log(response)
        return Promise.resolve(
            dispatch({
                type: actionTypes.CREATE_REPORT_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.CREATE_REPORT_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const updateReport = (data, id, headers, options) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.UPDATE_REPORT })
        let response = await api(reports(id), 'put', data, headers, options)
        console.log(response)
        return Promise.resolve(
            dispatch({
                type: actionTypes.UPDATE_REPORT_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(JSON.stringify(error,2,2))
        return Promise.reject(dispatch({ type: actionTypes.UPDATE_REPORT_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}