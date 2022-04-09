import { fromJS } from 'immutable';

/**
 * Enum
 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum LanguageEnum {
  EN = 'en',
  VI = 'vi',
}

/**
 * INITIAL_STATE
 */
export const INITIAL_STATE = fromJS({
  theme: ThemeEnum.LIGHT,
  language: LanguageEnum.EN,
  requireLogin: false,
});
