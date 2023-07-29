import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    penaltyTypes: [],
    penalties: [],
    createPenalty: {},
    updatePenalty: {},
    loading: false,
    error: ''
}

export default function penaltiesReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_PENALTIES: {
            return {
                ...state,
                loading: true,
                error: '',
                penalties: []
            }
        }
        case actionTypes.GET_PENALTIES_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                penalties: action.payload,
            }
        }
        case actionTypes.GET_PENALTIES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                penalties: []
            }
        }
        case actionTypes.GET_PENALTY_TYPES: {
            return {
                ...state,
                loading: true,
                error: '',
                penaltyTypes: []
            }
        }
        case actionTypes.GET_PENALTY_TYPES_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                penaltyTypes: action.payload,
            }
        }
        case actionTypes.GET_PENALTY_TYPES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                penaltyTypes: []
            }
        }
        case actionTypes.CREATE_PENALTY: {
            return {
                ...state,
                loading: true,
                error: '',
                createPenalty: {}
            }
        }
        case actionTypes.CREATE_PENALTY_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                createPenalty: action.payload,
            }
        }
        case actionTypes.CREATE_PENALTY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                createPenalty: {}
            }
        }
        case actionTypes.UPDATE_PENALTY: {
            return {
                ...state,
                loading: true,
                error: '',
                updatePenalty: {}
            }
        }
        case actionTypes.UPDATE_PENALTY_SUCCESS: {

            return {
                ...state,
                loading: false,
                error: '',
                updatePenalty: action.payload,
            }
        }
        case actionTypes.UPDATE_PENALTY_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                updatePenalty: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}