import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE, ThemeEnum } from './constant';

const theme = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    switchTheme: (state) => state.set('theme', state.get('theme') === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT),
    changeLanguage: (state, action) => state.set('language', action.payload),
    resetRequireLogin: (state) => state.set('requireLogin', INITIAL_STATE.get('requireLogin')),
  },
});

export const { switchTheme, changeLanguage, resetRequireLogin } = theme.actions;

export default theme.reducer;
