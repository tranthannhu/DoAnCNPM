import { createSlice } from '@reduxjs/toolkit';
import { createObjectReducer } from '@utils/redux';
import { REHYDRATE } from 'redux-persist';
import { fromJS } from 'immutable';
import { INITIAL_STATE, T, NAME } from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createObjectReducer<T>(NAME),
    logout: (state: any) => state,
  },
  extraReducers: {
    // Redux Persist (REHYDRATE)
    [REHYDRATE]: (state, action) => {
      if (action.payload && action.payload.login) {
        // Only persist data (ignore loading & error)
        const { login } = action.payload;
        return INITIAL_STATE.merge(
          fromJS({
            data: login.get('data'),
          }),
        );
      }
      return state;
    },
  },
});

export const {
  login, loginSuccess, loginFail, logout,
} = slice.actions;

export default slice.reducer;
