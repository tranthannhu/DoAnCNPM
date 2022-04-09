import { createArrayInitialState } from '@utils/redux';
import { fromJS } from 'immutable';

/**
 * Name
 */
export const NAME = 'myJobs';
export const LIST_FAVORITE = 'LIST_FAVORITE';
export const LIST_APPLIED = 'LIST_APPLIED';
export const LIST_RECENTLY = 'LIST_RECENTLY';
export const LIST_NEAREST = 'LIST_NEAREST';

export const INITIAL_STATE = fromJS({
  ...createArrayInitialState(LIST_FAVORITE),
  ...createArrayInitialState(LIST_APPLIED),
  ...createArrayInitialState(LIST_RECENTLY),
  ...createArrayInitialState(LIST_NEAREST),
});

export type TListFavorite = {
  myJobsGetFavorite: (state: any, action: any) => any;
  myJobsGetFavoriteSuccess: (state: any, action: any) => any;
  myJobsGetFavoriteFail: (state: any, action: any) => any;
};

export type TListApplied = {
  myJobsGetApplied: (state: any, action: any) => any;
  myJobsGetAppliedSuccess: (state: any, action: any) => any;
  myJobsGetAppliedFail: (state: any, action: any) => any;
};

export type TListRecently = {
  myJobsGetRecently: (state: any, action: any) => any;
  myJobsGetRecentlySuccess: (state: any, action: any) => any;
  myJobsGetRecentlyFail: (state: any, action: any) => any;
};

export type TListNearest = {
  myJobsGetNearest: (state: any, action: any) => any;
  myJobsGetNearestSuccess: (state: any, action: any) => any;
  myJobsGetNearestFail: (state: any, action: any) => any;
};
