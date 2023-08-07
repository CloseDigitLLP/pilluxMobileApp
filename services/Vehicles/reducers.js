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

            return {
                ...state,
                loading: false,
                error: '',
                vehicle: action.payload,
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
        case actionTypes.GET_VEHICLES: {
            return {
                ...state,
                loading: true,
                error: '',
                vehicles: []
            }
        }
        case actionTypes.GET_VEHICLES_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                vehicles: action.payload,
            }
        }
        case actionTypes.GET_VEHICLES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                vehicles: []
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}