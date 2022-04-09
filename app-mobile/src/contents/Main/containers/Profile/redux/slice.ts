import { createSlice } from '@reduxjs/toolkit';
import { createArrayReducer, createObjectReducer } from '@utils/redux';
import {
  DETAIL,
  INITIAL_STATE,
  LIST_SKILL,
  NAME,
  TDetail,
  TListSkill,
} from './constant';

const profileSlice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...createObjectReducer<TDetail>(`${NAME}GetDetail`, DETAIL),
    ...createArrayReducer<TListSkill>(`${NAME}GetListSkill`, LIST_SKILL),
  },
});

export const {
  profileGetDetail,
  profileGetDetailFail,
  profileGetDetailSuccess,
  profileGetListSkill,
  profileGetListSkillFail,
  profileGetListSkillSuccess,
} = profileSlice.actions;

export default profileSlice.reducer;
