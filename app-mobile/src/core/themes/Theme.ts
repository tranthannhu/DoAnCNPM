import {
  bottomNavigationBarHeight,
  headerPaddingHorizontal,
  bodyPaddingHorizontal,
  shadowViewLight,
  shadowViewDark,
  darkComponentColor,
  lightComponentColor,
} from './ThemeComponent/Common/CommonProps';
import {
  Color,
  darkPlatform,
  lightPlatform,
  darkPrimaryColor,
  darkSecondaryColor,
  lightPrimaryColor,
  lightSecondaryColor,
} from './ThemeComponent/Common/Color';
import { darkText, lightText } from './ThemeComponent/Text';
import { darkButton, lightButton } from './ThemeComponent/Button';
import { darkHeader, lightHeader } from './ThemeComponent/Header';
import { darkInput, lightInput } from './ThemeComponent/Input';
import { darkCheckBox, lightCheckBox } from './ThemeComponent/ListCheckBox';
import { darkDropdown, lightDropdown } from './ThemeComponent/Dropdown';
import { darkModal, lightModal } from './ThemeComponent/Modal';
import { lightParallaxScrollView, darkParallaxScrollView } from './ThemeComponent/ParallaxScrollView';

const ThemeEnum = {
  DARK: 'dark',
  LIGHT: 'light',
};

/**
 * Theme
 */
export const darkTheme = {
  key: ThemeEnum.DARK,
  colors: {
    primary: darkPrimaryColor,
    secondary: darkSecondaryColor,

    white: Color.white,
    grey1: Color.grey1,
    grey2: Color.grey2,
    grey3: Color.grey3,
    grey4: Color.grey4,
    grey5: Color.grey5,
    grey6: Color.grey6,
    grey7: Color.grey7,
    grey8: Color.grey8,
    grey10: Color.grey10,
    black: Color.black,

    greyOutline: '#bbb',
    searchBg: '#303337',

    success: Color.green,
    error: Color.red,
    warning: Color.yellow,
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: Color.grey6,
    border: Color.grey9,
    platform: darkPlatform,

    /**
    * Component Color
    */
    bgColor: darkComponentColor.bgColor,
    bgColorSecondary: darkComponentColor.bgColorSecondary,
    textColor: darkComponentColor.textColor,
    textColorSecondary: darkComponentColor.textColorSecondary,
  },
  /**
   * Component
   */
  bottomNavigationBarHeight,
  headerPaddingHorizontal,
  bodyPaddingHorizontal,
  shadowView: shadowViewDark,

  Text: darkText,
  Button: darkButton,
  Header: darkHeader,
  Input: darkInput,
  CheckBox: darkCheckBox,
  Dropdown: darkDropdown,
  AppModal: darkModal,
  ParallaxScrollView: darkParallaxScrollView,
};

export const lightTheme = {
  key: ThemeEnum.LIGHT,
  colors: {
    primary: lightPrimaryColor,
    secondary: lightSecondaryColor,

    white: Color.white,
    grey1: Color.grey1,
    grey2: Color.grey2,
    grey3: Color.grey3,
    grey4: Color.grey4,
    grey5: Color.grey5,
    grey6: Color.grey6,
    grey7: Color.grey7,
    grey8: Color.grey8,
    grey10: Color.grey10,
    black: Color.black,

    greyOutline: '#bbb',
    searchBg: '#303337',

    listItemBg: Color.white,
    success: Color.green,
    error: Color.red,
    warning: Color.yellow,
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: Color.grey2,
    border: Color.grey2,
    platform: lightPlatform,

    /**
     * Component Color
     */
    bgColor: lightComponentColor.bgColor,
    bgColorSecondary: lightComponentColor.bgColorSecondary,
    textColor: lightComponentColor.textColor,
    textColorSecondary: lightComponentColor.textColorSecondary,
  },

  /**
   * Component
   */
  bottomNavigationBarHeight,
  headerPaddingHorizontal,
  bodyPaddingHorizontal,
  shadowView: shadowViewLight,

  Text: lightText,
  Button: lightButton,
  Header: lightHeader,
  Input: lightInput,
  CheckBox: lightCheckBox,
  Dropdown: lightDropdown,
  AppModal: lightModal,
  ParallaxScrollView: lightParallaxScrollView,
};

export { Color };
export default lightTheme;
