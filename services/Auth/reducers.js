import * as actionTypes from './actionTypes'

const initialState = {
    loading: false,
    error: '',
    data: {},
    completed: false
}

export default function authReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.LOGIN: {
            return { ...state, loading: true, error: '', completed: false, data: {} }
        }
        case actionTypes.LOGIN_SUCCESS: {
            return { ...state, loading: false, error: '', completed: true, data: action.payload }
        }
        case actionTypes.LOGIN_FAILED: {
            return { ...state, loading: false, error: action.payload, completed: true, data: {} }
        }
        case actionTypes.LOGOUT: {
            return initialState
        }
        default: return state
    }
}