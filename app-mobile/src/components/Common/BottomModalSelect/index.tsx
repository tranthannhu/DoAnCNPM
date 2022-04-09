import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { Props as ListCheckBoxProps } from '@components/common/ListCheckBox';
import ListCheckBox from '../ListCheckBox';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    // height: 0,
  },
  overlayModal: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.65)',
  },
  containerStyle: {
    flex: 1,
  },
});

export interface Props extends Pick<ListCheckBoxProps, 'checkBoxProps'> {
  iconColor?: string;
  closeIcon?: boolean;
  title?: string;
  titleConfirm?: string;
  titleStyles?: any;
  buttonConfirmStyles?: any;
  titleConfirmStyles?: any;
  data?: any;
  onChange?: any;
  onConfirm?: any;
  multi?: boolean;
  defaultVal?: Array<string | number>;
  wrapStyles?: any;
  headerContainerStyles?: any;
  renderContent?: any;
  contentContainerStyles?: any;
}

interface State {
  modalFilter: boolean;
  modalAnimatedValue: any;
  preValue: Array<string | number>;
  assistValue: Array<string | number>;
}

class BottomModalSelect extends Component<Props, State> {
  static defaultProps = {
    closeIcon: true,
    multi: false,
  };

  constructor(props: Props) {
    super(props);
    const { defaultVal, data } = this.props;
    this.state = {
      modalFilter: false,
      modalAnimatedValue: new Animated.Value(0),
      preValue: defaultVal || (data ? [data[0].id] : []),
      assistValue: defaultVal || (data ? [data[0].id] : []),
    };
  }

  handleOpenFilter = () => {
    const { modalFilter, modalAnimatedValue } = this.state;

    if (modalFilter) {
      return;
    }
    this.setState({ modalFilter: true }, () => {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  handlePressDone = () => {
    const { modalAnimatedValue, preValue } = this.state;
    const { onConfirm } = this.props;
    // console.log('done', preValue);
    if (!_.isUndefined(onConfirm)) {
      onConfirm(preValue);
    }
    this.setState({
      assistValue: preValue,
    });

    Animated.timing(modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalFilter: false });
    });
  };

  handlePressClose = () => {
    const { modalAnimatedValue } = this.state;
    Animated.timing(modalAnimatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ modalFilter: false });
    });
  };

  onSelect = (preValue: any) => {
    const { onChange, multi } = this.props;
    const preValueArrTemp = [];
    preValueArrTemp.push(preValue);
    // console.log('preValue', preValue);
    if (!_.isUndefined(onChange)) {
      onChange(preValue);
    }
    this.setState({
      preValue: multi ? preValue : preValueArrTemp,
    });
  };

  render() {
    const { modalFilter, modalAnimatedValue, assistValue } = this.state;
    const {
      closeIcon,
      title,
      titleConfirm,
      titleStyles,
      buttonConfirmStyles,
      titleConfirmStyles,
      data,
      multi,
      wrapStyles,
      headerContainerStyles,
      renderContent,
      contentContainerStyles,
      iconColor,
      checkBoxProps,
    } = this.props;

    const opacity = modalAnimatedValue;
    const translateY = modalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [400, 0],
    });
    return (
      <View
        //  style={styles.containerStyle}
        testID="BottomModalSelect"
      >
        {modalFilter ? (
          <View
            style={styles.wrapper}
            pointerEvents={modalFilter ? 'auto' : 'none'}
          >
            <TouchableWithoutFeedback onPress={this.handlePressDone}>
              <Animated.View style={[styles.overlayModal, { opacity }]} />
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                transform: [{ translateY }],
              }}
            >
              <View
                style={[
                  {
                    width,
                    backgroundColor: '#F1F8FE',
                    height: height / 2 - 50,
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                  },
                  wrapStyles,
                ]}
              >
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      paddingBottom: 20,
                      paddingTop: 10,
                      backgroundColor: '#F1F8FE',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // borderWidth: 1,
                      // flex: 1,
                    },
                    headerContainerStyles,
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      width: '10%',
                      justifyContent: 'center',
                      // borderWidth: 1,
                    }}
                    onPress={this.handlePressClose}
                  >
                    {closeIcon ? (
                      <Icon
                        name="close"
                        size={24}
                        color={iconColor || '#000000'}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '60%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // borderWidth: 1,
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: '#00358E',
                          ...titleStyles,
                        },
                      ]}
                    >
                      {title || 'Chọn'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F1F8FE',
                      padding: 10,
                      width: '20%',
                      // borderWidth: 1,
                      alignItems: 'center',
                      ...buttonConfirmStyles,
                    }}
                    onPress={this.handlePressDone}
                  >
                    <Text style={{ color: '#315DF7', ...titleConfirmStyles }}>
                      {titleConfirm || 'Xong'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    {
                      paddingHorizontal: 15,
                      paddingVertical: 20,
                      flex: 2,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      // borderWidth: 1,
                    },
                    contentContainerStyles,
                  ]}
                >
                  <ScrollView>
                    {renderContent || (
                      <ListCheckBox
                        data={data || []}
                        onChange={(value: any) => this.onSelect(value)}
                        single={!multi}
                        checkBoxProps={{
                          textStyle: { color: '#333333' },
                          ...checkBoxProps,
                        }}
                        assistVal={assistValue}
                      />
                    )}
                  </ScrollView>
                </View>
              </View>
            </Animated.View>
          </View>
        ) : null}
      </View>
    );
  }
}
export default BottomModalSelect;
