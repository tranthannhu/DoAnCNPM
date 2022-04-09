import { createArraySelector } from '@utils/selector';
import { DETAIL, NAME, LIST_SKILL } from './constant';

export const root = (state: any) => state[NAME];
export const profileSelector = createArraySelector(root, DETAIL);
export const skillSelector = createArraySelector(root, LIST_SKILL);
