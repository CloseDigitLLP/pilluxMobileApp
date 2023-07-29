import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    vehicles: [],
    savedVehiclesData: [],
    vehicle: {},
    loading: false,
    error: ''
}

export default function vehiclesReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_VEHICLE: {
            return {
                ...state,
                loading: true,
                error: '',
                vehicle: {}
            }
        }
        case actionTypes.GET_VEHICLE_SUCCESS: {

            let savedVehicleIndex = state?.savedVehiclesData?.findIndex((vehicle) => vehicle?.id == action.payload.id)
            let updatedVehiclesData = []
            if(savedVehicleIndex >= 0){
                updatedVehiclesData = state?.savedVehiclesData
                updatedVehiclesData[savedVehicleIndex] = action.payload
            }

            return {
                ...state,
                loading: false,
                error: '',
                vehicle: action.payload,
                savedVehiclesData: savedVehicleIndex >= 0 ? updatedVehiclesData : [...(state?.savedVehiclesData || []), action.payload]
            }
        }
        case actionTypes.GET_VEHICLE_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                vehicle: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}