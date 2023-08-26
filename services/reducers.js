import { combineReducers } from 'redux'
import authReducer from './Auth/reducers'
import eventsReducer from './Events/reducers'
import studentsReducer from './Students/reducers'
import vehiclesReducer from './Vehicles/reducers'
import repairsReducer from './Repairs/reducers'
import penaltiesReducer from './Penalties/reducers'
import reportsReducer from './Reports/reducers'
import examWishlistReducer from './ExamWishlist/reducers'
import statisticsReducer from './Statistics/reducers'

const rootReducer = combineReducers({
    authReducer,
    eventsReducer,
    studentsReducer,
    vehiclesReducer,
    repairsReducer,
    penaltiesReducer,
    reportsReducer,
    examWishlistReducer,
    statisticsReducer
})

export default rootReducer