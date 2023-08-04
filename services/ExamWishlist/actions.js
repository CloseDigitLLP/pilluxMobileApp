import { api } from '../../config/constants'
import { examWishlists, users } from '../../config/urls'
import * as actionTypes from './actionTypes'


export const createExamWishlist = (data) => async (dispatch) => {
    try{
        dispatch({ type: actionTypes.CREATE_EXAM_WISHLIST })
        let response = await api(examWishlists(), 'post', data)
        return Promise.resolve(
            dispatch({
                type: actionTypes.CREATE_EXAM_WISHLIST_SUCCESS,
                payload: response?.data?.data
            })
        )
    }catch(error){
        console.log(error)
        return Promise.reject(dispatch({ type: actionTypes.CREATE_EXAM_WISHLIST_FAILED, payload: error?.response?.data?.message || error?.message }))
    }
}