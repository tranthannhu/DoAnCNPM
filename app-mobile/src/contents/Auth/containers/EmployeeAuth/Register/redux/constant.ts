import { fromJS } from 'immutable';
import { createObjectInitialState } from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = 'auth';
export const NAME = 'register';

/**
 * TYPE
 */
export type T = {
  register: (state: any, action: any) => any;
  registerSuccess: (state: any, action: any) => any;
  registerFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS(createObjectInitialState());
