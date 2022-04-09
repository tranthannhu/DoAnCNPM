import React, { PureComponent } from 'react';

// @ts-ignore
import Modal from 'react-native-modal';
import {
  View, Button, StyleSheet, Text,
} from 'react-native';

interface State {
  isVisible: boolean
}
interface Props {
  title?: String,
  content?: String,
  viewComponent?: any,
  isVisibleProps?: boolean,
  backgroundColor?: string,
  textColor?: string,
  onClickClose: any,
}

class FancyModal extends PureComponent<Props, State> {
  render() {
    const {
      viewComponent, textColor, isVisibleProps, title, content, backgroundColor, onClickClose,
    } = this.props;
    const bgColor: any = StyleSheet.flatten([
      content,
      {
        backgroundColor,
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    ]);
    const textColors = StyleSheet.flatten([
      {
        color: textColor,
        fontSize: 20,
        marginBottom: 12,
      },
    ]);
    return (
      <Modal
        isVisible={isVisibleProps}
        backdropColor={backgroundColor}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        {!viewComponent ? (
          <View style={bgColor}>
            <Text style={textColors}>{title || 'Thông báo'}</Text>
            <Text style={textColors}>{content || ''}</Text>
            <Button
              testID="close-button"
              onPress={onClickClose}
              title="Close"
            />
          </View>
        ) : viewComponent}
      </Modal>
    );
  }
}

export default FancyModal;
