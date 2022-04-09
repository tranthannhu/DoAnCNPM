import { call, takeLatest, put } from 'redux-saga/effects';
import { fetchMyfavoriteJobs, getAppliedJob, getRecentView } from './api';
import {
  myJobsGetFavorite,
  myJobsGetFavoriteFail,
  myJobsGetFavoriteSuccess,
  myJobsGetApplied,
  myJobsGetAppliedSuccess,
  myJobsGetAppliedFail,
  myJobsGetRecently,
  myJobsGetRecentlySuccess,
  myJobsGetRecentlyFail,
  myJobsGetNearest,
} from './slice';

export function* getListFavoriteJobs() {
  try {
    const response = yield call(fetchMyfavoriteJobs);
    yield put(myJobsGetFavoriteSuccess(response));
    return true;
  } catch (error) {
    yield put(myJobsGetFavoriteFail(error));
    return false;
  }
}

export function* getListAppliedJobs() {
  try {
    const response = yield call(getAppliedJob);
    yield put(myJobsGetAppliedSuccess(response));
    return true;
  } catch (error) {
    yield put(myJobsGetAppliedFail(error));
    return false;
  }
}

export function* getListRecentView() {
  try {
    const response = yield call(getRecentView);
    yield put(myJobsGetRecentlySuccess(response));
    return true;
  } catch (error) {
    yield put(myJobsGetRecentlyFail(error));
    return false;
  }
}

export function* getListNearest({ payload }: { payload: any }): any {
  try {
    const response = yield call(getListNearest, payload.data);
    console.log('res', response);
    return true;
  } catch (error) {
    yield put(error);
    return false;
  }
}

export default [
  takeLatest(myJobsGetFavorite, getListFavoriteJobs),
  takeLatest(myJobsGetApplied, getListAppliedJobs),
  takeLatest(myJobsGetRecently, getListRecentView),
  takeLatest(myJobsGetNearest, getListNearest),
];
