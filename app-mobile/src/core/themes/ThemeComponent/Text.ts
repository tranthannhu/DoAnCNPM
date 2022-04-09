import { lightComponentColor, darkComponentColor } from './Common/CommonProps';

/**
 * Text
 */
const headerFontSize = 28;
const headerFontWeight = 'bold';
const xTitleFontSize = 24;
const titleFontSize = 20;
const paragraphFontSize = 16;
const subtitleFontSize = 14;

export const darkText = {
  header: {
    color: darkComponentColor.textColor,
    fontWeight: headerFontWeight,
    fontSize: headerFontSize,
  },
  xTitle: {
    color: darkComponentColor.textColor,
    fontSize: xTitleFontSize,
  },
  title: {
    color: darkComponentColor.textColor,
    fontSize: titleFontSize,
  },
  paragraph: {
    color: darkComponentColor.textColor,
    fontSize: paragraphFontSize,
  },
  subtitle: {
    color: darkComponentColor.textColorSecondary,
    fontSize: subtitleFontSize,
  },
};
export const lightText = {
  header: {
    color: lightComponentColor.textColor,
    fontWeight: headerFontWeight,
    fontSize: headerFontSize,
  },
  xTitle: {
    color: lightComponentColor.textColor,
    fontSize: xTitleFontSize,
  },
  title: {
    color: lightComponentColor.textColor,
    fontSize: titleFontSize,
  },
  paragraph: {
    color: lightComponentColor.textColor,
    fontSize: paragraphFontSize,
  },
  subtitle: {
    color: lightComponentColor.textColorSecondary,
    fontSize: subtitleFontSize,
  },
};
