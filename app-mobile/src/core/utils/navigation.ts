import * as React from 'react';
import { StackActions } from '@react-navigation/native';
import { Easing } from 'react-native';

interface IScreen {
  screen?: string;
  params?: any;
}

const navigationRef: any = React.createRef();

const navigate = (stack: string, screen?: any) => navigationRef.current?.navigate(stack, screen);

const getCurrentRoute = () => navigationRef.current?.getCurrentRoute();

const canGoBack = () => navigationRef.current?.canGoBack();

const getRootState = () => navigationRef.current?.getRootState();

const goBack = () => navigationRef.current?.goBack();

// eslint-disable-next-line max-len
const push = (stack: string, screen?: any) => navigationRef.current?.dispatch(StackActions.push(stack, screen));

const pop = (count: number = 1) => navigationRef.current?.dispatch(StackActions.pop(count));

const popToTop = () => navigationRef.current?.dispatch(StackActions.popToTop());

const NavigationService = {
  navigationRef,
  navigate,
  getCurrentRoute,
  canGoBack,
  getRootState,
  goBack,
  push,
  pop,
  popToTop,
};
export default NavigationService;

/**
 * Animation
 */

const forFade = ({ current }: { current: any }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const config = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.circle,
  },
};

const transitionSpecConfig: any = {
  open: config,
  close: config,
};

export const fadeAnimation = {
  cardStyleInterpolator: forFade,
  transitionSpec: transitionSpecConfig,
};
