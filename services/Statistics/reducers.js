import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    instructorHours: [],
    instructorAvgHours: [],
    instructorAbsentHours: [],
    instructorExamWishlistCount: {},
    vehiclePayments: [],
    loading: false,
    error: ''
}

export default function statisticsReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_INSTRUCTOR_HOURS: {
            return {
                ...state,
                loading: true,
                error: '',
                instructorHours: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_HOURS_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                instructorHours: action.payload,
            }
        }
        case actionTypes.GET_INSTRUCTOR_HOURS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                instructorHours: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_AVG_HOURS: {
            return {
                ...state,
                loading: true,
                error: '',
                instructorAvgHours: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_AVG_HOURS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                instructorAvgHours: action.payload,
            }
        }
        case actionTypes.GET_INSTRUCTOR_AVG_HOURS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                instructorAvgHours: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT: {
            return {
                ...state,
                loading: true,
                error: '',
                instructorExamWishlistCount: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                instructorExamWishlistCount: action.payload,
            }
        }
        case actionTypes.GET_INSTRUCTOR_EXAMWISHLIST_COUNT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                instructorExamWishlistCount: []
            }
        }
        case actionTypes.GET_VEHICLE_PAYMENTS_STATS: {
            return {
                ...state,
                loading: true,
                error: '',
                vehiclePayments: []
            }
        }
        case actionTypes.GET_VEHICLE_PAYMENTS_STATS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                vehiclePayments: action.payload,
            }
        }
        case actionTypes.GET_VEHICLE_PAYMENTS_STATS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                vehiclePayments: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_ABSENT_HOURS: {
            return {
                ...state,
                loading: true,
                error: '',
                instructorAbsentHours: []
            }
        }
        case actionTypes.GET_INSTRUCTOR_ABSENT_HOURS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                instructorAbsentHours: action.payload,
            }
        }
        case actionTypes.GET_INSTRUCTOR_ABSENT_HOURS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                instructorAbsentHours: []
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}