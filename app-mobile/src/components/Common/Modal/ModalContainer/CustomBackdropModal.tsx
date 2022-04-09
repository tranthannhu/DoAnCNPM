import React, { PureComponent } from 'react';

// @ts-ignore
import Modal from 'react-native-modal';
import {
  View, Button, StyleSheet, SafeAreaView, Text,
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
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
  title: {
    fontWeight: 'bold',
  },
});

class CustomBackdropModal extends PureComponent<Props, State> {
  render() {
    const {
      viewComponent, isVisibleProps, title, content, backgroundColor, textColor, onClickClose,
    } = this.props;
    const bgColor: any = StyleSheet.flatten([
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
        customBackdrop={
          <SafeAreaView style={styles.customBackdrop} />
          }
      >
        {
            !viewComponent ? (
              <View style={bgColor}>
                <Text style={[styles.customBackdropText, textColors]}>
                  {title || 'Thông báo'}
                </Text>
                <Text style={textColors}>{content || ''}</Text>
                <Button
                  testID="close-button"
                  onPress={onClickClose}
                  title="Close"
                />
              </View>
            ) : viewComponent
          }
      </Modal>
    );
  }
}

export default CustomBackdropModal;
