import { Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import {
  Color,
  darkPrimaryColor,
  darkSecondaryColor,
  lightPrimaryColor,
  lightSecondaryColor,
} from './Color';

/**
 * Component Props
 */

export const getBottomNavigationBarHeight = () => {
  try {
    const DeviceInfo = require('react-native-device-info');
    return DeviceInfo.hasNotch() ? 85 : 70;
  } catch (error) {
    return 70;
  }
};
export const getHeaderHeight = () => {
  try {
    const DeviceInfo = require('react-native-device-info');
    return DeviceInfo.hasNotch() ? 85 : 70;
  } catch (error) {
    return 70;
  }
};

export const bottomNavigationBarHeight = getBottomNavigationBarHeight();
export const headerHeight = getHeaderHeight();
export const headerPaddingHorizontal = 18;
export const bodyPaddingHorizontal = 18;
export const roundedBorderRadius = 20;

export const shadowViewDark = Platform.select({
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: 'rgba(119, 119, 119, 0.5)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export const shadowViewLight = Platform.select({
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 4,
  },
});

/**
 * Component Color
 */
export const darkComponentColor = {
  textColor: darkPrimaryColor,
  textColorSecondary: darkSecondaryColor,
  bgColor: Color.black,
  bgColorSecondary: Color.grey7,
};
export const lightComponentColor = {
  textColor: lightPrimaryColor,
  textColorSecondary: lightSecondaryColor,
  bgColor: Color.white,
  bgColorSecondary: Color.grey3,
};
