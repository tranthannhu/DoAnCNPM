import { call, takeLatest, put } from 'redux-saga/effects';
import { fetchDetailProfile, fetchSkill } from './api';
import {
  profileGetDetail,
  profileGetDetailFail,
  profileGetDetailSuccess,
  profileGetListSkill,
  profileGetListSkillFail,
  profileGetListSkillSuccess,
} from './slice';

export function* getDetailProfile() {
  try {
    const response = yield call(fetchDetailProfile);
    yield put(profileGetDetailSuccess(response.data[0]));
    return true;
  } catch (error) {
    yield put(profileGetDetailFail(error));
    return false;
  }
}
export function* getListSkills() {
  try {
    const response = yield call(fetchSkill);
    console.log('list skill', response);

    yield put(profileGetListSkillSuccess(response));
    return true;
  } catch (error) {
    yield put(profileGetListSkillFail(error));
    return false;
  }
}

export default [
  takeLatest(profileGetDetail, getDetailProfile),
  takeLatest(profileGetListSkill, getListSkills),
];
