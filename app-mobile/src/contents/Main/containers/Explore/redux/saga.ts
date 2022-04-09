import { stringifyQuery } from '@utils/redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import { Global } from '@utils/appHelper';
import {
  jobGetList,
  jobGetListSuccess,
  jobGetDetailFail,
  jobGetDetailSuccess,
  jobGetDetail,
  jobAppliesFail,
  jobAppliesSuccess,
  jobGetListCate,
  jobGetListCateSuccess,
  jobGetListCateFail,
  jobGetListCompany,
  jobGetListCompanySuccess,
  jobGetListCompanyFail,
  jobGetListSearch,
  jobGetListSearchSuccess,
  jobGetListSearchFail,
  jobGetListFail,
} from './slice';
import {
  fetchAllJobs,
  fetchDetailJobs,
  fetchDetailRecently,
  appliesJob,
  fetchAllCates,
} from './api';

import { setPage } from '@src/redux/tags/tagsSlice';


export function* getListSaga({ payload }) {
  try {
    const data = yield call(fetchAllJobs, stringifyQuery(payload.query));
    const currentPage = data.data.page;
    if (data.data.count) {
      yield put(setPage(currentPage))
      yield put(jobGetListSuccess(data));
    }
    else throw ('No more')
  } catch (error) {
    yield put(jobGetListFail(error));
  }
}

export function* getListPopularJob({ payload }: { payload: any }) {
  const data = yield call(fetchAllJobs, stringifyQuery(payload.query));
  yield put(jobGetListSuccess(data));
}

export function* getDetailSaga({ payload }: { payload: any }) {
  try {
    let response;
    if (Global.token) {
      response = yield call(fetchDetailRecently, payload.id);
    } else {
      response = yield call(fetchDetailJobs, payload.id);
    }
    yield put(jobGetDetailSuccess(response));
    return true;
  } catch (error) {
    yield put(jobGetDetailFail(yield* handleException(error)));
    return false;
  }
}
export function* appliesJobSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(appliesJob, payload.id);
    yield put(jobAppliesSuccess(response));
  } catch (error) {
    yield put(jobAppliesFail(yield* handleException(error)));
  }
}
export function* getListCatesSaga() {
  try {
    const response = yield call(fetchAllCates);
    yield put(jobGetListCateSuccess(response));
  } catch (error) {
    yield put(jobGetListCateFail(error));
  }
}

export function* getListJobCompany({ payload }: { payload: any }) {
  try {
    const data = yield call(fetchAllJobs, stringifyQuery(payload.query));
    yield put(jobGetListCompanySuccess(data));
  } catch (error) {
    yield put(jobGetListCompanyFail(error));
  }
}

export function* getListSearch({ payload }: { payload: any }) {
  try {
    const data = yield call(fetchAllJobs, stringifyQuery(payload.query));
    console.log('data', data);

    yield put(jobGetListSearchSuccess(data));
  } catch (error) {
    yield put(jobGetListSearchFail(error));
  }
}

export default [
  takeLatest(jobGetList, getListSaga),
  takeLatest(jobGetDetail, getDetailSaga),
  takeLatest(jobGetListCate, getListCatesSaga),
  takeLatest(jobGetListCompany, getListJobCompany),
  takeLatest(jobGetListSearch, getListSearch),
];
