import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  data: {},
  verifyEmail: {},
  verifyOtp: {},
  savePassword: {},
  changePassword: {},
  updateProfile: {},
  completed: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return { ...state, loading: true, error: "", completed: false, data: {} };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        data: action.payload,
      };
    }
    case actionTypes.LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        data: {},
      };
    }
    case actionTypes.VERIFY_EMAIL: {
      return { ...state, loading: true, error: "", completed: false, verifyEmail: {} };
    }
    case actionTypes.VERIFY_EMAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        verifyEmail: action.payload,
      };
    }
    case actionTypes.VERIFY_EMAIL_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        verifyEmail: {},
      };
    }
    case actionTypes.VERIFY_OTP: {
      return { ...state, loading: true, error: "", completed: false, verifyOtp: {} };
    }
    case actionTypes.VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        verifyOtp: action.payload,
      };
    }
    case actionTypes.VERIFY_OTP_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        verifyOtp: {},
      };
    }
    case actionTypes.SAVE_PASSWORD: {
      return { ...state, loading: true, error: "", completed: false, savePassword: {} };
    }
    case actionTypes.SAVE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        savePassword: action.payload,
      };
    }
    case actionTypes.SAVE_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        savePassword: {},
      };
    }
    case actionTypes.CHANGE_PASSWORD: {
      return { ...state, loading: true, error: "", completed: false, changePassword: {} };
    }
    case actionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        changePassword: action.payload,
      };
    }
    case actionTypes.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        changePassword: {},
      };
    }
    case actionTypes.UPDATE_PROFILE: {
      return { ...state, loading: true, error: "", completed: false, updateProfile: {} };
    }
    case actionTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: "",
        completed: true,
        updateProfile: action.payload,
        data: {
          ...state?.data,
          data: {
            ...state?.data?.data,
            firstname: action.payload?.[0]?.firstname,
            lastname: action.payload?.[0]?.lastname
          }
        }
      };
    }
    case actionTypes.UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        completed: true,
        updateProfile: {},
      };
    }
    case actionTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
