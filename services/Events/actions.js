import { api } from "../../config/constants";
import { planning } from "../../config/urls";
import * as actionTypes from "./actionTypes";

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_EVENTS });
    let response = await api(planning(), "get");
    return Promise.resolve(
      dispatch({
        type: actionTypes.GET_EVENTS_SUCCESS,
        payload: response?.data?.data,
      })
    );
  } catch (error) {
    console.log(error);
    return Promise.reject(
      dispatch({
        type: actionTypes.GET_EVENTS_FAILED,
        payload: error?.response?.data?.message || error?.message,
      })
    );
  }
};

export const updateEvent = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_EVENT });
    let response = await api(planning(id), "put", data);
    return Promise.resolve(
      dispatch({
        type: actionTypes.UPDATE_EVENT_SUCCESS,
        payload: response?.data?.data,
      })
    );
  } catch (error) {
    console.log(error);
    return Promise.reject(
      dispatch({
        type: actionTypes.UPDATE_EVENT_FAILED,
        payload: error?.response?.data?.message || error?.message,
      })
    );
  }
};
export const updateLocalEvents = (data) => (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_LOCAL_EVENTS });
    return dispatch({
      type: actionTypes.UPDATE_LOCAL_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: actionTypes.UPDATE_LOCAL_EVENTS_FAILED,
      payload: error?.response?.data?.message || error?.message,
    });
  }
};
