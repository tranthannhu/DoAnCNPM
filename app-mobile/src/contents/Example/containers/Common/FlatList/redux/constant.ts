import { fromJS } from 'immutable';
import { createArrayInitialState, createObjectInitialState } from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = '';
export const NAME = 'product';

export const LIST = 'list';
export const DETAIL = 'detail';

/**
 * TYPE
 */
export type TList = {
  productGetList: (state: any, action: any) => any;
  productGetListSuccess: (state: any, action: any) => any;
  productGetListFail: (state: any, action: any) => any;
};
export type TDetail = {
  productGetDetail: (state: any, action: any) => any;
  productGetDetailSuccess: (state: any, action: any) => any;
  productGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST),
  ...createObjectInitialState(DETAIL),
});
