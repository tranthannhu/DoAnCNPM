/* eslint-disable import/prefer-default-export */
import { post } from '@utils/api';
import { IRegisterInput } from './model';

export const registerApi = (data: IRegisterInput) =>
  post('/users/register', data);
