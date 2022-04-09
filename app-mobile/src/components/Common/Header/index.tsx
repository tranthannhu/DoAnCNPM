import React, { PureComponent } from 'react';
import {
  StyleSheet, Image,
} from 'react-native';
import {
  withTheme, ThemeProps,
  Header as EHeader,
  HeaderProps as EHeaderProps,
  Icon,
} from 'react-native-elements';
import NavigationService from '@utils/navigation';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import { headerHeight } from '@themes/ThemeComponent/Common/CommonProps';
import QuickView from '../View/QuickView';

export interface HeaderProps extends EHeaderProps {
  height?: number | string;
  width?: number | string;
  position?: 'relative' | 'absolute';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  backgroundColor?: string;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  transparent?: boolean;
  backIcon?: boolean;
  leftIconBackgroundColor?: string;
  closeIcon?: boolean;
  title?: string;
  logo?: boolean;
  switchTheme?: boolean;
  shadow?: boolean;
  leftColor?: string;
  centerColor?: string;
  rightColor?: string;
  color?: string;
  theme?: any;
}

const styles = StyleSheet.create({
  defaultTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  defaultLogoStyle: {
    width: 84,
    height: 30,
    resizeMode: 'contain',
  },
});

class Header extends PureComponent<HeaderProps> {
  static defaultProps = {
    placement: 'center',
    leftIconBackgroundColor: 'transparent',
    height: headerHeight,
    width: '100%',
  };

  render() {
    const {
      position,
      height,
      width,
      top,
      left,
      right,
      bottom,
      backgroundColor: backgroundColorProp,
      transparent,
      backIcon,
      leftIconBackgroundColor,
      closeIcon,
      title,
      leftColor: leftColorProp,
      centerColor: centerColorProp,
      rightColor: rightColorProp,
      color: colorProp,
      borderBottomColor,
      borderBottomWidth,
      placement,
      logo,
      containerStyle: containerStyleProp,
      leftContainerStyle: leftContainerStyleProp,
      leftComponent: leftComponentProp,
      centerContainerStyle: centerContainerStyleProp,
      centerComponent: centerComponentProp,
      rightContainerStyle: rightContainerStyleProp,
      rightComponent: rightComponentProp,
      shadow,
      switchTheme,
      theme,
      ...otherProps
    } = this.props;

    const backgroundColor = transparent ? 'transparent' : (backgroundColorProp || theme.Header.backgroundColor);
    let leftColor = leftColorProp || theme.Header.leftColor;
    let centerColor = centerColorProp || theme.Header.centerColor;
    let rightColor = rightColorProp || theme.Header.rightColor;
    if (colorProp) {
      leftColor = colorProp;
      centerColor = colorProp;
      rightColor = colorProp;
    }

    const containerStyle = StyleSheet.flatten([
      {
        position,
        height,
        width,
        top,
        left,
        right,
        bottom,
        borderBottomColor,
        borderBottomWidth,
        backgroundColor,
        paddingBottom: 10,
        paddingHorizontal: theme.headerPaddingHorizontal,
      },
      shadow ? [{ marginBottom: 3 }, theme.shadowView] : undefined,
      containerStyleProp,
    ]);

    /**
     * Left Component
     */
    const leftContainerStyle = StyleSheet.flatten([
      {
        paddingRight: ((backIcon || closeIcon)) ? 10 : 0,
      },
      leftContainerStyleProp,
    ]);
    let leftComponent: any = leftComponentProp;
    if (backIcon) {
      leftComponent = {
        icon: 'arrowleft',
        type: 'antdesign',
        size: 25,
        color: leftColor,
        onPress: () => NavigationService.goBack(),
        style: {
          width: 25, height: 25,
        },
        containerStyle: leftIconBackgroundColor !== 'transparent' ? {
          padding: 8, backgroundColor: leftIconBackgroundColor, borderRadius: 20,
        } : null,
      };
    } else if (closeIcon) {
      leftComponent = {
        icon: 'close',
        type: 'antdesign',
        size: 25,
        color: leftColor,
        onPress: () => NavigationService.goBack(),
        style: {
          width: 25, height: 25,
        },
        containerStyle: leftIconBackgroundColor !== 'transparent' ? {
          padding: 8, backgroundColor: leftIconBackgroundColor, borderRadius: 20,
        } : null,
      };
    }

    /**
     * Center Component
     */
    let centerComponent: any = centerComponentProp;
    if (title) {
      centerComponent = {
        text: title,
        style: StyleSheet.flatten([
          styles.defaultTitleStyle,
          {
            marginLeft: backIcon || closeIcon ? -10 : 0,
            color: centerColor,
          },
          centerContainerStyleProp,
        ]),
      };
    } else if (logo) {
      centerComponent = (
        <QuickView testID="centerComponentLogo" marginLeft={(backIcon && placement === 'center') || (closeIcon && placement === 'center') ? -20 : 0}>
          <Image
            style={styles.defaultLogoStyle}
            source={require('@images/headerLogo.png')}
          />
        </QuickView>
      );
    }

    /**
     * Right Component
     */
    let rightComponent: any = rightComponentProp;
    if (switchTheme) {
      rightComponent = (
        <QuickView testID="rightComponentSwitchTheme" row center>
          <Icon name="theme-light-dark" type="material-community" style={{ marginRight: 5 }} color={rightColor} />
          <SwitchChangeTheme />
        </QuickView>
      );
    }

    return (
      <EHeader
        {...otherProps}
        placement={placement}
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
        containerStyle={containerStyle}
        leftContainerStyle={leftContainerStyle}
        ViewComponent={QuickView}
        linearGradientProps={{ backgroundColor: 'blue' }}
      />
    );
  }
}

export default withTheme(Header as React.ComponentType<HeaderProps & ThemeProps<any>>);
