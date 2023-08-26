import { api } from '../../config/constants'
import { planning, statistics, student, vehicle } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const getInstuctorHours = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_INSTRUCTOR_HOURS })
        let response = await api(statistics('instructorHours'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_INSTRUCTOR_HOURS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_INSTRUCTOR_HOURS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getInstuctorAvgHours = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_INSTRUCTOR_AVG_HOURS })
        let response = await api(statistics('instructorAverage'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_INSTRUCTOR_AVG_HOURS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_INSTRUCTOR_AVG_HOURS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getInstuctorExamWishlistCount = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT })
        let response = await api(statistics('instructorWishlist'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getVehiclePaymentsStats = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_VEHICLE_PAYMENTS_STATS })
        let response = await api(statistics('instructorVehicleStats'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_VEHICLE_PAYMENTS_STATS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_VEHICLE_PAYMENTS_STATS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getInstuctorAbsentHours = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_INSTRUCTOR_ABSENT_HOURS })
        let response = await api(statistics('instructorAbsent'), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_INSTRUCTOR_ABSENT_HOURS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_INSTRUCTOR_ABSENT_HOURS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}
