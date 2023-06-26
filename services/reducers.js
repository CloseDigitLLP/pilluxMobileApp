import { combineReducers } from 'redux'
import authReducer from './Auth/reducers'

const rootReducer = combineReducers({
    authReducer
})

export default rootReducer