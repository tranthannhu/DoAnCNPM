import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import {
  NAME,
  LIST_FAVORITE,
  INITIAL_STATE,
  TListFavorite,
  TListApplied,
  LIST_APPLIED,
  TListRecently,
  LIST_RECENTLY,
  TListNearest,
  LIST_NEAREST,
} from './constant';

const myJobsSlice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createArrayReducer<TListFavorite>(`${NAME}GetFavorite`, LIST_FAVORITE),
    ...createArrayReducer<TListApplied>(`${NAME}GetApplied`, LIST_APPLIED),
    ...createArrayReducer<TListRecently>(`${NAME}GetRecently`, LIST_RECENTLY),
    ...createArrayReducer<TListNearest>(`${NAME}GetNearest`, LIST_NEAREST),
  },
});

export const {
  myJobsGetFavorite,
  myJobsGetFavoriteFail,
  myJobsGetFavoriteSuccess,
  myJobsGetApplied,
  myJobsGetAppliedFail,
  myJobsGetAppliedSuccess,
  myJobsGetRecently,
  myJobsGetRecentlySuccess,
  myJobsGetRecentlyFail,
  myJobsGetNearest,
  myJobsGetNearestSuccess,
  myJobsGetNearestFail,
} = myJobsSlice.actions;

export default myJobsSlice.reducer;
