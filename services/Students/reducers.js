import { LOGOUT } from '../Auth/actionTypes'
import * as actionTypes from './actionTypes'

const initialState = {
    students: [],
    updateStudent: [],
    loading: false,
    error: ''
}

export default function studentsReducer (state=initialState, action) {
    switch(action.type){
        case actionTypes.UPDATE_STUDENT: {
            return {
                ...state,
                loading: true,
                error: '',
                updateStudent: []
            }
        }
        case actionTypes.UPDATE_STUDENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                updateStudent: action.payload
            }
        }
        case actionTypes.UPDATE_STUDENT_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                updateStudent: []
            }
        }
        case actionTypes.GET_STUDENTS: {
            return {
                ...state,
                loading: true,
                error: '',
                students: []
            }
        }
        case actionTypes.GET_STUDENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: '',
                students: action.payload
            }
        }
        case actionTypes.GET_STUDENTS_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload,
                students: []
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: return state
    }
}