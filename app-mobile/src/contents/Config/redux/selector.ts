import { getSelector } from '@utils/selector';

export const root = (state: any) => state.config;

export const themeSelector = getSelector(root, 'theme');

export const languageSelector = getSelector(root, 'language');

export const requireLoginSelector = getSelector(root, 'requireLogin');
