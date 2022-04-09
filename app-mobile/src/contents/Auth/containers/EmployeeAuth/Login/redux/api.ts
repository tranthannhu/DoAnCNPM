/* eslint-disable import/prefer-default-export */
import { post } from '@utils/api';
import { ILogInInput } from './model';

export const realtorLoginApi = (data: ILogInInput) => post('/auth', data);
