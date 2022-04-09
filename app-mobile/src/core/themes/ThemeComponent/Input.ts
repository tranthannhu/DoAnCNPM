import { darkComponentColor, lightComponentColor, roundedBorderRadius } from './Common/CommonProps';

/**
 * Input
 */
const sharpBorderBottomWidth = 0;
const roundedBorderBottomWidth = 0;
const underlineBorderBottomWidth = 0;
const sharpFontSize = 14;
const roundedFontSize = 14;
const underlineFontSize = 14;

/**
 * Color
 */
const darkBackgroundColor = darkComponentColor.bgColorSecondary;
const darkTextColor = darkComponentColor.textColor;
const lightBackgroundColor = '#E6E9F0';
const lightTextColor = lightComponentColor.textColor;

export const darkInput = {
  sharp: {
    containerStyle: {
      backgroundColor: darkBackgroundColor,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: darkTextColor,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: darkBackgroundColor,
      borderRadius: roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: darkTextColor,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: darkTextColor,
      fontSize: underlineFontSize,
    },
  },
};

export const lightInput = {
  sharp: {
    containerStyle: {
      backgroundColor: lightBackgroundColor,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: lightTextColor,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: lightBackgroundColor,
      borderRadius: roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: lightTextColor,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: lightTextColor,
      fontSize: underlineFontSize,
    },
  },
};
