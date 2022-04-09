/* eslint-disable import/prefer-default-export */
import { select } from 'redux-saga/effects';
import { languageSelector } from '@contents/Config/redux/selector';
import { LanguageEnum } from '@contents/Config/redux/constant';
import { TError } from './redux';
import vi from '../locales/vi.json';
import en from '../locales/en.json';

export function* handleException(error: any) {
  const currentLang = yield select((state) => languageSelector(state));
  const exception: any = currentLang === LanguageEnum.VI ? vi.exception : en.exception;
  const handledError: TError = {
    code: error.code,
    messages: [exception[error.code]],
  };
  return handledError;
}
