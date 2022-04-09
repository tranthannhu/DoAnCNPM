import { lightComponentColor, darkComponentColor } from './Common/CommonProps';

/**
 * ParallaxScrollView
 */

export const parallaxHeaderHeight = 300;
export const stickyHeaderHeight = 85;

export const darkParallaxScrollView = {
  parallaxHeaderHeight,
  stickyHeaderHeight,
  imageBackgroundColor: 'rgba(0,0,0,.4)',
  headerBackgroundColor: darkComponentColor.bgColorSecondary,
  contentBackgroundColor: darkComponentColor.bgColor,
};
export const lightParallaxScrollView = {
  parallaxHeaderHeight,
  stickyHeaderHeight,
  imageBackgroundColor: 'rgba(255, 255, 255, 0.1)',
  headerBackgroundColor: lightComponentColor.bgColorSecondary,
  contentBackgroundColor: lightComponentColor.bgColor,
};
