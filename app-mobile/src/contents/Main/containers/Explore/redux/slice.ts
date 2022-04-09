import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import {
  INITIAL_STATE,
  NAME,
  TList,
  LIST,
  TDetail,
  DETAIL,
  T,
  LIST_CATE,
  TListCate,
  TListJobByCompany,
  COMPANY_JOB,
  TListSearch,
  LIST_SEARCH,
} from './constant';

const jobSlice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createArrayReducer<TList>(`${NAME}GetList`, LIST),
    ...createObjectReducer<TDetail>(`${NAME}GetDetail`, DETAIL, LIST),
    ...createObjectReducer<T>(`${NAME}Applies`),
    ...createArrayReducer<TListCate>(`${NAME}GetListCate`, LIST_CATE),
    ...createArrayReducer<TListJobByCompany>(
      `${NAME}GetListCompany`,
      COMPANY_JOB,
    ),
    ...createArrayReducer<TListSearch>(`${NAME}GetListSearch`, LIST_SEARCH),
    setFilter: (state: any, action: any) =>
      state.set('setFilter', action.payload.s),
    setMoreFilter(state: any, action) {
      return state.set('moreCategory', action.payload)
    },
  },
});
export const {
  jobGetListFail,
  jobGetListSuccess,
  jobGetList,
  jobGetDetail,
  jobGetDetailFail,
  jobGetDetailSuccess,
  jobApplies,
  jobAppliesSuccess,
  jobAppliesFail,
  jobGetListCate,
  jobGetListCateSuccess,
  jobGetListCateFail,
  setFilter,
  jobGetListCompany,
  jobGetListCompanySuccess,
  jobGetListCompanyFail,
  jobGetListSearch,
  jobGetListSearchSuccess,
  jobGetListSearchFail,
  setMoreFilter
} = jobSlice.actions;

export default jobSlice.reducer;
