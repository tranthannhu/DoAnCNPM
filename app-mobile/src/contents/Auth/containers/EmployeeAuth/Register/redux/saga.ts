import { put, call, takeLatest, select } from 'redux-saga/effects';
import { register, registerSuccess, registerFail } from './slice';
import { registerApi } from './api';
import { handleException } from '@utils/exception';

export function* registerSaga({ payload }: { payload: any }) {
  try {
    const preResponse = yield call(registerApi, payload.data);
    const response = preResponse.data;
    yield put(registerSuccess(response));
    return true;
  } catch (error) {
    console.log('err', error);

    yield put(registerFail(yield* handleException(error)));
    return false;
  }
}

export default [takeLatest(register, registerSaga)];
