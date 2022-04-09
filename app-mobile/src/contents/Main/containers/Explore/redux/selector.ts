import { DETAIL } from '@contents/Example/containers/Common/FlatList/redux/constant';
import { createArraySelector, createObjectSelector } from '@utils/selector';
import { LIST, NAME, LIST_CATE, COMPANY_JOB, LIST_SEARCH } from './constant';

export const root = (state: any) => state[NAME];

export const jobListSelector = createArraySelector(root, LIST);
export const jobDetailSelector = createObjectSelector(root, DETAIL);
export const jobCateSelector = createArraySelector(root, LIST_CATE);
export const jobListCompanySelector = createArraySelector(root, COMPANY_JOB);
export const jobListSearchSelector = createArraySelector(root, LIST_SEARCH);
