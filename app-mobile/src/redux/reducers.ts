import { combineReducers } from 'redux';
import config from '@contents/Config/redux/slice';
import auth from '@contents/Auth/redux/reducer';
import product from '@contents/Example/containers/Common/FlatList/redux/slice';
import job from '@contents/Main/containers/Explore/redux/slice';
import profile from '@contents/Main/containers/Profile/redux/slice';
import myJobs from '@contents/Main/containers/MyJobs/redux/slice';
import { Global } from '@utils/appHelper';
import _ from 'lodash';
import jobDetail from './jobDetail/jobDetailSlice';
import apply from './apply/applySlice';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tags from './tags/tagsSlice';

const appReducers = combineReducers({
  config,
  auth,
  product,
  job,
  profile,
  myJobs,
  jobDetail,
  apply,
  tags
});

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_REDUX') {
    // eslint-disable-next-line no-console
    console.log('RESET_REDUX Called');
    Global.token = '';
    // state = undefined;
    state = _.pick(state, ['config']);
  }
  return appReducers(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
