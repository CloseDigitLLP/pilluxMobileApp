import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    events: [],
    updateEvent: {},
    loading: false,
    error: ''
}

export default function eventsReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.GET_EVENTS: {
            return {
                ...state,
                loading: true,
                error: '',
                events: []
            }
        }
        case actionTypes.GET_EVENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                events: action.payload
            }
        }
        case actionTypes.GET_EVENTS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                events: []
            }
        }
        case actionTypes.UPDATE_EVENT: {
            return {
                ...state,
                loading: true,
                error: '',
                updateEvent: {}
            }
        }
        case actionTypes.UPDATE_EVENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                updateEvent: action.payload
            }
        }
        case actionTypes.UPDATE_EVENT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                updateEvent: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}