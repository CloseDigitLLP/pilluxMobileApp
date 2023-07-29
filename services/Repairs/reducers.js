import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    repairTypes: [],
    repairs: [],
    createRepair: {},
    updateRepair: {},
    loading: false,
    error: ''
}

export default function repairsReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_REPAIRS: {
            return {
                ...state,
                loading: true,
                error: '',
                repairs: []
            }
        }
        case actionTypes.GET_REPAIRS_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                repairs: action.payload,
            }
        }
        case actionTypes.GET_REPAIRS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                repairs: []
            }
        }
        case actionTypes.GET_REPAIR_TYPES: {
            return {
                ...state,
                loading: true,
                error: '',
                repairTypes: []
            }
        }
        case actionTypes.GET_REPAIR_TYPES_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                repairTypes: action.payload,
            }
        }
        case actionTypes.GET_REPAIR_TYPES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                repairTypes: []
            }
        }
        case actionTypes.CREATE_REPAIR: {
            return {
                ...state,
                loading: true,
                error: '',
                createRepair: {}
            }
        }
        case actionTypes.CREATE_REPAIR_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                createRepair: action.payload,
            }
        }
        case actionTypes.CREATE_REPAIR_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                createRepair: {}
            }
        }
        case actionTypes.UPDATE_REPAIR: {
            return {
                ...state,
                loading: true,
                error: '',
                updateRepair: {}
            }
        }
        case actionTypes.UPDATE_REPAIR_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                updateRepair: action.payload,
            }
        }
        case actionTypes.UPDATE_REPAIR_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                updateRepair: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}