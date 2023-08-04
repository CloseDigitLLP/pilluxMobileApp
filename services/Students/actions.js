import { api } from '../../config/constants'
import { planning, student } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const updateStudentSkill = (data, id) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.UPDATE_STUDENT })
        let response = await api(student('skills'), 'post', data)
        console.log(response?.data, "UPDATED DDDDDDDDDDD")
        return Promise.resolve(
            dispatch({
                type: actionTypes.UPDATE_STUDENT_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.UPDATE_STUDENT_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}

export const getAllStudents = () => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.GET_STUDENTS })
        let response = await api(student(), 'get')
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_STUDENTS_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.GET_STUDENTS_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}