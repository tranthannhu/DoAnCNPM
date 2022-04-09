import { get } from '@utils/api';

export const fetchDetailProfile = () => get('/auth/me');

export const fetchSkill = () => get('/skill');
