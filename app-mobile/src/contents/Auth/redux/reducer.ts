import login from '@contents/Auth/containers/Index/Login/redux/slice';
import register from '@contents/Auth/containers/EmployeeAuth/Register/redux/slice';
import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { immutableTransform } from '@utils/redux';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
  whitelist: ['login'],
};

const auth = persistReducer(
  persistConfig,
  combineReducers({
    login,
    register,
  }),
);
export default auth;
