import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    createUser: {},
    loading: false,
    error: ''
}

export default function examWishlistReducer(state=initialState, action) {
    switch(action.type){
        case actionTypes.CREATE_EXAM_WISHLIST: {
            return {
                ...state,
                loading: true,
                error: '',
                createUser: {}
            }
        }
        case actionTypes.CREATE_EXAM_WISHLIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                createUser: action.payload
            }
        }
        case actionTypes.CREATE_EXAM_WISHLIST_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                createUser: {}
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}