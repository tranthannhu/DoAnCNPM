import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '@themes';
import En from '@locales/en.json';
import Vi from '@locales/vi.json';
import { ThemeEnum, LanguageEnum } from '../../contents/Config/redux/constant';

export const Global: any = global;

export async function viewAsyncStorageData() {
  const keys = await AsyncStorage.getAllKeys();
  const itemsArray = await AsyncStorage.multiGet(keys);
  const result: any = {};
  itemsArray.map((item) => {
    // eslint-disable-next-line prefer-destructuring
    result[`${item[0]}`] = item[1];
    return result;
  });
  return result;
}

export function getIdFromParams(props: any) {
  const {
    route,
  } = props;
  return route?.params?.id;
}

export function getParams(props: any) {
  const {
    route,
  } = props;
  return route?.params;
}

export function setIdIntoParams(item: any) {
  return { id: item.id };
}

export function focusNextField(component: any, name: string) {
  component[name]?.focus();
}

export function getThemeByName(themeName: ThemeEnum = ThemeEnum.LIGHT): any {
  return themeName === ThemeEnum.DARK ? darkTheme : lightTheme;
}

export function getLanguageByName(languageName: LanguageEnum = LanguageEnum.EN): any {
  return languageName === LanguageEnum.EN ? En : Vi;
}
