import { get, post } from '@utils/api';

export const fetchAllJobs = (queryString: string) => get(`/jobs?${queryString}`);

export const fetchDetailJobs = (id: string) => get(`/jobs/${id}`);

export const fetchDetailRecently = (id: string) => get(`/jobs/getOne/recently/${id}`);

export const fetchDetailJob = (id:string, queryString:string) => get(`/jobs/detail/${id}?userId=${queryString}`);

export const appliesJob = (id: string) => post(`/jobs/${id}/applies`);

export const fetchAllCates = () => get('/categories/all');

export const isFavorite = (id: string) => post(`/jobs/${id}/favorites`);

// export const getCategories = (queryString: string) => get('/jobs?${q}')
