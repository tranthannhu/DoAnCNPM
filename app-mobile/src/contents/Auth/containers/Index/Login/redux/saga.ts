import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import { Global } from '@utils/appHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import NavigationService from '@utils/navigation';
import mainBottomTab from '@contents/Main/routes';
import {
  loginSuccess, loginFail, login, logout,
} from './slice';
import { realtorLoginApi } from './api';

export function* realtorLoginSaga({ payload }: { payload: any }) {
  try {
    const preResponse = yield call(realtorLoginApi, payload.data);
    const response = preResponse.data;
    Global.token = response.token;
    yield put(loginSuccess(response));
    const requiredLogin = yield select((state) => requireLoginSelector(state));
    if (!requiredLogin) {
      // yield call(NavigationService.goBack);
      yield call(NavigationService.navigate, mainBottomTab.homeStack);
    }
    return true;
  } catch (error) {
    yield put(loginFail(yield* handleException(error)));
    return false;
  }
}

async function removeAsyncStorageData() {
  await AsyncStorage.removeItem('persist:auth');
  await AsyncStorage.removeItem('persist:root');
  return true;
}

export function* realtorLogoutSaga() {
  try {
    // Check Result
    // const before = yield call(viewAsyncStorageData);
    // console.log('before remove', before);
    // yield call(removeAsyncStorageData);
    // const after = yield call(viewAsyncStorageData);
    // console.log('after remove', after);

    yield call(removeAsyncStorageData);
    yield put({ type: 'RESET_REDUX' });
    // const requiredLogin = yield select((state) => requireLoginSelector(state));
    yield call(NavigationService.goBack());
    // if (!requiredLogin) {
    //   yield call(NavigationService.navigate, exampleStack.exampleList);
    // }
    return true;
  } catch (error) {
    return false;
  }
}

export default [
  takeLatest(login, realtorLoginSaga),
  takeLatest(logout, realtorLogoutSaga),
];
