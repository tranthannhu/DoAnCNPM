import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Button, Text, ScrollView,
} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';

interface State {
  isVisible?: boolean;
  scrollOffset: any;
}
interface Props {
  viewComponent?: any;
  isVisibleProps?: boolean;
  content?: String;
  title?: String;
  backgroundColor?: string;
  textColor?: string;
  height?: number;
  onClickClose: any;
  scroll?: boolean;
}
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 600,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});
class BottomHalfModal extends PureComponent<Props, State> {
  private scrollViewRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      scrollOffset: 0,
    };
    this.scrollViewRef = React.createRef();
  }

  handleOnScroll = (event: any) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p: any) => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  render() {
    const {
      viewComponent,
      isVisibleProps,
      title,
      content,
      backgroundColor,
      textColor,
      onClickClose,
      height,
      scroll,
    } = this.props;
    const { scrollOffset } = this.state;
    const bgColor: any = StyleSheet.flatten([
      {
        backgroundColor,
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: height || 200,
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
      <View>
        {!scroll ? (
          <Modal
            testID="modal"
            isVisible={isVisibleProps}
            onSwipeComplete={onClickClose}
            swipeDirection={['down']}
            style={styles.view}
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
            ) : (
              viewComponent
            )}
          </Modal>
        ) : (
          <Modal
            testID="modal"
            isVisible={isVisibleProps}
            onSwipeComplete={onClickClose}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={50} // content height - ScrollView height
            propagateSwipe
            style={styles.modal}
          >
            <View style={styles.scrollableModal}>
              <View
                style={{
                  width: 50,
                  height: 3,
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  marginTop: 5,
                }}
              />
              <ScrollView
                ref={this.scrollViewRef}
                onScroll={this.handleOnScroll}
                scrollEventThrottle={16}
              >
                {viewComponent}
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

export default BottomHalfModal;
