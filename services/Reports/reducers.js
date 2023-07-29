import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    reportTypes: [],
    reports: [],
    createReport: {},
    updateReport: {},
    loading: false,
    error: ''
}

export default function reportsReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_REPORTS: {
            return {
                ...state,
                loading: true,
                error: '',
                reports: []
            }
        }
        case actionTypes.GET_REPORTS_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                reports: action.payload,
            }
        }
        case actionTypes.GET_REPORTS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                reports: []
            }
        }
        case actionTypes.GET_REPORT_TYPES: {
            return {
                ...state,
                loading: true,
                error: '',
                reportTypes: []
            }
        }
        case actionTypes.GET_REPORT_TYPES_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                reportTypes: action.payload,
            }
        }
        case actionTypes.GET_REPORT_TYPES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                reportTypes: []
            }
        }
        case actionTypes.CREATE_REPORT: {
            return {
                ...state,
                loading: true,
                error: '',
                createReport: {}
            }
        }
        case actionTypes.CREATE_REPORT_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                createReport: action.payload,
            }
        }
        case actionTypes.CREATE_REPORT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                createReport: {}
            }
        }
        case actionTypes.UPDATE_REPORT: {
            return {
                ...state,
                loading: true,
                error: '',
                updateReport: {}
            }
        }
        case actionTypes.UPDATE_REPORT_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                updateReport: action.payload,
            }
        }
        case actionTypes.UPDATE_REPORT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                updateReport: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}