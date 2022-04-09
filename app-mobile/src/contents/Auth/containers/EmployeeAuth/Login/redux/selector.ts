import { createObjectSelector } from '@utils/selector';
import { PARENT_NAME, NAME } from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const loginSelector = createObjectSelector(root);
