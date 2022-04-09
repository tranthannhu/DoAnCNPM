import { Platform } from 'react-native';
import { Color, lightPlatform, darkPlatform } from './Common/Color';

/**
 * CheckBox
 */
export const darkCheckBox = {
  textStyle: {
    color: Color.white,
  },
  checkedColor: Platform.OS === 'ios' ? darkPlatform.ios.primary : darkPlatform.android.primary,
  containerStyle: { backgroundColor: Color.black },
};
export const lightCheckBox = {
  textStyle: {
    color: Color.black,
  },
  checkedColor: Platform.OS === 'ios' ? lightPlatform.ios.primary : lightPlatform.android.primary,
  containerStyle: { backgroundColor: Color.white },
};
