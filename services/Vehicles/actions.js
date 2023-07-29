import { api } from '../../config/constants'
import { planning, student, vehicle } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const getVehicle = (id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_VEHICLE })
        let response = await api(vehicle(id), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_VEHICLE_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_VEHICLE_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}