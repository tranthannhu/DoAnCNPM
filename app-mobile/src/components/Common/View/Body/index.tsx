import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView, { QuickViewProps } from '../QuickView';

export interface BodyProps extends QuickViewProps {
  theme?: any;
  secondary?: boolean;
  primary?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullView?: boolean;
}

class Body extends PureComponent<BodyProps> {
  static defaultProps = {
    primary: true,
  };

  render() {
    const {
      backgroundColor: backgroundColorProp,
      paddingHorizontal: paddingHorizontalProp,
      secondary,
      fullView,
      fullWidth,
      fullHeight,
      theme,
      style: styleProp,
      children,
      ...otherProps
    } = this.props;

    let backgroundColor = backgroundColorProp
      || (secondary ? theme.colors.bgColorSecondary : theme.colors.bgColor);
    const paddingHorizontal = fullWidth || fullView
      ? 0
      : paddingHorizontalProp || theme.bodyPaddingHorizontal;

    const { backgroundImage } = this.props;
    if (backgroundImage) backgroundColor = 'transparent';

    const style = StyleSheet.flatten([
      { backgroundColor, paddingHorizontal, flex: 1 },
      styleProp,
    ]);

    if (fullHeight || fullView) {
      return (
        <QuickView testID="FullHeightBodyView" {...otherProps} style={style}>
          {children}
        </QuickView>
      );
    }

    return (
      <SafeAreaView testID="SafeAreaBodyView" style={{ flex: 1 }}>
        <QuickView {...otherProps} style={style}>
          {children}
        </QuickView>
      </SafeAreaView>
    );
  }
}

export default withTheme(
  Body as React.ComponentType<BodyProps & ThemeProps<any>>,
);
