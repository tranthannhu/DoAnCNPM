import { createArraySelector, createObjectSelector } from '@utils/selector';
import {
  PARENT_NAME, NAME, LIST, DETAIL,
} from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const productListSelector = createArraySelector(root, LIST);

export const productDetailSelector = createObjectSelector(root, DETAIL);
