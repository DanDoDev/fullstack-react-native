import {createStore, combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {globalReducer, sensorReducer} from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  globalReducer,
  sensorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());

export {store};
