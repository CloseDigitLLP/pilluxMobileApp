import { applyMiddleware, compose, createStore,} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

const persistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)
  

const middleware = applyMiddleware(thunk);

const composeEnhancers = compose;

export const store = createStore(persistedReducer,  composeEnhancers(middleware));
export const persistor = persistStore(store)