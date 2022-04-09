import {
  createArrayInitialState,
  createObjectInitialState,
} from '@utils/redux';
import { fromJS } from 'immutable';

/**
 * Name
 */
export const NAME = 'profile';
export const DETAIL = 'detail';
export const LIST = 'LIST';
export const LIST_SKILL = 'LIST_SKILL';

export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST_SKILL),
  ...createObjectInitialState(DETAIL),
});

export type TDetail = {
  profileGetDetail: (state: any, action: any) => any;
  profileGetDetailSuccess: (state: any, action: any) => any;
  profileGetDetailFail: (state: any, action: any) => any;
};

export type TListSkill = {
  profileGetListSkill: (state: any, action: any) => any;
  profileGetListSkillSuccess: (state: any, action: any) => any;
  profileGetListSkillFail: (state: any, action: any) => any;
};
