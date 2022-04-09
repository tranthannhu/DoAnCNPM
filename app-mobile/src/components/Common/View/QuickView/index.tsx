import React, { PureComponent } from 'react';
import {
  View,
  ImageBackgroundProps,
  ImageBackground,
  StyleSheet,
  ViewProps,
  TouchableOpacityProps,
  TouchableOpacity,
  ScrollView,
  ScrollViewProps,
  TouchableWithoutFeedback,
  Keyboard,
  GestureResponderEvent,
} from 'react-native';
import {
  roundedBorderRadius,
  shadowViewLight,
} from '@themes/ThemeComponent/Common/CommonProps';
import _ from 'lodash';

export interface QuickViewProps
  extends ViewProps,
  TouchableOpacityProps,
  ScrollViewProps {
  width?: number | string;
  height?: number | string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  position?: 'absolute' | 'relative';
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  center?: boolean;
  horizontalCenter?: boolean;
  verticalCenter?: boolean;
  style?: any;
  children?: any;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  justifyContent?:
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between';
  alignSelf?:
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
  alignItems?:
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
  backgroundColor?: string;
  flex?: number;
  backgroundImage?: ImageBackgroundProps;
  backgroundImageStyle?: any;
  sharp?: boolean;
  rounded?: boolean;
  circle?: boolean;
  scroll?: boolean;
  touchableComponent?: 'TouchableOpacity' | 'TouchableWithoutFeedback';
  dismissKeyboard?: boolean;
  shadow?: boolean;
  testID?: string;
}

class QuickView extends PureComponent<QuickViewProps> {
  static defaultProps = {
    column: true,
    touchableComponent: 'TouchableOpacity',
  };

  render() {
    const {
      width: widthProp,
      height: heightProp,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      borderRadius: borderRadiusProp,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      position,
      top,
      bottom,
      left,
      right,
      center,
      horizontalCenter,
      verticalCenter,
      style,
      children,
      row: rowProp,
      column: columnProp,
      rowReverse: rowReverseProp,
      columnReverse: columnReverseProp,
      justifyContent,
      alignSelf,
      alignItems,
      backgroundColor,
      flex,
      backgroundImage,
      backgroundImageStyle,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      scroll,
      touchableComponent: touchableComponentProp,
      dismissKeyboard,
      shadow,
      onPress: onPressProp,
      ...otherProps
    } = this.props;

    /**
     * containerStyle
     */
    let row = rowProp;
    let rowReverse = rowReverseProp;
    let column = columnProp;
    let columnReverse = columnReverseProp;
    if (row || rowReverse) {
      column = false;
      columnReverse = false;
    }
    if (column || columnReverse) {
      row = false;
      rowReverse = false;
    }

    /**
     * sharp, rounded, circle
     */
    let width = widthProp;
    let height = heightProp;
    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }

    /**
     * containerStyle
     */
    const containerStyle = StyleSheet.flatten([
      {
        width,
        height,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        padding,
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingHorizontal,
        paddingBottom,
        paddingVertical,
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        position,
        top,
        bottom,
        left,
        right,
        justifyContent,
        alignSelf,
        alignItems,
        backgroundColor,
        flex,
      },
      shadow && { paddingBottom: paddingBottom || 3 },
      shadow && shadowViewLight,
      center && {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ((horizontalCenter && !(row || rowReverse))
        || (verticalCenter && (row || rowReverse))) && {
        alignItems: 'center',
      },
      ((horizontalCenter && (row || rowReverse))
        || (verticalCenter && !(row || rowReverse))) && {
        justifyContent: 'center',
      },
      row && { flexDirection: 'row' },
      column && { flexDirection: 'column' },
      rowReverse && { flexDirection: 'row-reverse' },
      columnReverse && { flexDirection: 'column-reverse' },
      style,
    ]);

    let onPress: any = onPressProp;
    let touchableComponent = touchableComponentProp;
    if (dismissKeyboard) {
      onPress = (event: GestureResponderEvent) => {
        Keyboard.dismiss();
        if (onPressProp) onPressProp(event);
      };
      touchableComponent = 'TouchableWithoutFeedback';
    }

    let Component: any;
    if (onPress) {
      switch (touchableComponent) {
        case 'TouchableWithoutFeedback':
          Component = TouchableWithoutFeedback;
          break;
        default:
          Component = TouchableOpacity;
          break;
      }
    } else if (scroll) {
      Component = ScrollView;
    } else {
      Component = View;
    }

    if (backgroundImage) {
      const backgroundStyle: any = [
        {
          flex: 1,
          resizeMode: 'cover',
        },
        backgroundImageStyle,
      ];
      return (
        <ImageBackground style={backgroundStyle} {...backgroundImage}>
          <Component {...otherProps} onPress={onPress} style={containerStyle}>
            {children}
          </Component>
        </ImageBackground>
      );
    }
    return (
      <Component {...otherProps} style={containerStyle} onPress={onPress}>
        {children}
      </Component>
    );
  }
}

export default QuickView;
