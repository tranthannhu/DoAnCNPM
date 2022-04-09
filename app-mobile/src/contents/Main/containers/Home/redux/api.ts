import { get } from '@utils/api';

export const fetchAllJob = () => get('/jobs/favorites');
