import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView, { QuickViewProps } from '../QuickView';

export interface ContainerProps extends QuickViewProps {
  theme?: any;
  secondary?: boolean;
}

class Container extends PureComponent<ContainerProps> {
  render() {
    const {
      backgroundColor: backgroundColorProp,
      secondary,
      theme,
      style,
      children,
      ...otherProps
    } = this.props;

    const backgroundColor = backgroundColorProp
    || (secondary ? theme.colors.bgColorSecondary : theme.colors.bgColor);
    const containerStyle = StyleSheet.flatten([
      { flex: 1, backgroundColor },
      style,
    ]);

    return (
      <QuickView {...otherProps} style={containerStyle}>
        {children}
      </QuickView>
    );
  }
}

export default withTheme(Container as React.ComponentType<ContainerProps & ThemeProps<any>>);
