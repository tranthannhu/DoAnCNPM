import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar as EAvatar,
  AvatarProps as EAvatarProps,
} from 'react-native-elements';

export interface AvatarProps extends EAvatarProps {
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string;
}

class Avatar extends React.PureComponent<AvatarProps> {
  render() {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      backgroundColor,
      overlayContainerStyle: overlayContainerStyleProp,
      containerStyle: containerStyleProp,
    } = this.props;

    const overlayContainerStyle = StyleSheet.flatten([
      { backgroundColor },
      overlayContainerStyleProp,
    ]);

    const containerStyle = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
      },
      containerStyleProp,
    ]);

    return (
      <EAvatar
        {...this.props}
        overlayContainerStyle={overlayContainerStyle}
        containerStyle={containerStyle}
      />
    );
  }
}

export default Avatar;
