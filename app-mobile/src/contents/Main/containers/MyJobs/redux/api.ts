import { get } from '@utils/api';
import { IGetList } from './mode';

export const fetchMyfavoriteJobs = () => get('/jobs/favorites');

export const getAppliedJob = () => get(`/jobs/applied`);

export const getRecentView = () => get('/auth/me/recently');

export const getListNearest = (data: IGetList) =>
  get('/jobs/nearest/all', data);
