import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import { REHYDRATE } from 'redux-persist';
import {
  INITIAL_STATE, TList, NAME, LIST, TDetail, DETAIL,
} from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createArrayReducer<TList>(`${NAME}GetList`, LIST),
    ...createObjectReducer<TDetail>(`${NAME}GetDetail`, DETAIL, LIST),
  },
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      if (action.payload && action.payload.product) {
        const list = action.payload.product.get('list');
        return INITIAL_STATE.merge({
          list: INITIAL_STATE.get('list').merge({ data: list.get('data') }),
        });
      }
      return state;
    },
  },
});

export const {
  productGetList, productGetListSuccess, productGetListFail,
  productGetDetail, productGetDetailSuccess, productGetDetailFail,
} = slice.actions;

export default slice.reducer;
