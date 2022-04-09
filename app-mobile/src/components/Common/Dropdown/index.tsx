/* eslint-disable no-nested-ternary */
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme, ThemeProps } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  textInput: {
    fontWeight: 'bold',
  },
  containerInput: {
    // borderWidth: 1,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#FFFFFF',
    // textAlign: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    // zIndex: 1000,
    // elevation: 1000,
  },
  isSelected: {
    // /borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#315DF7',
    // top: -10,
  },
  isNotSelected: {
    // /borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    // top: -10,
  },
  // textOption: {
  //   fontSize:
  // }
  rotateIcon: {
    transform: [{ rotate: '180deg' }],
  },

  containerDropdownStyles: {
    overflow: 'scroll',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    position: 'absolute',
  },
  infoViewStyles: {
    width: '90%',
    justifyContent: 'center',
  },
});

interface Props {
  defaultValue?: number | string;
  onChange?: any;
  containerStyle?: any;
  dropdownStyles?: any;
  activeColor?: string;
  activeTextColor?: string;
  data: any;
  inActiveTextColor?: string;
  inActiveColor?: string;
  placeholderColor?: string;
  iconComponent?: any;
  iconSize?: number;
  iconColor?: string;
  placeholder?: string;
  theme?: any;
  // inActiveComponent?: any;
  // activeComponent?: any;
}
interface State {
  rotateIcon: boolean;
  value: number | string;
}

class Dropdown extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    const { defaultValue, data } = this.props;
    let valueSeclected = data[0].value;
    if (defaultValue) {
      valueSeclected = defaultValue;
    }
    this.state = {
      rotateIcon: false,
      value: valueSeclected,
    };
  }

  setValue = (value: any) => () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.setState({
      value,
      rotateIcon: false,
    });
  };

  render() {
    const {
      containerStyle,
      dropdownStyles,
      activeColor,
      activeTextColor,
      data,
      placeholderColor,
      inActiveColor,
      inActiveTextColor,
      iconComponent,
      iconSize,
      iconColor,
      placeholder,
      theme,
    } = this.props;
    const { rotateIcon, value } = this.state;
    let labelSelected = placeholder || 'Select item';
    // let checkWidth: any;

    if (value) {
      data.forEach((item: any) => {
        if (value === item.value) {
          labelSelected = item.label;
        }
      });
    } else {
      labelSelected = placeholder || 'Select item';
    }

    const textStyles = StyleSheet.flatten([
      styles.textInput,
      { color: placeholderColor || theme.Dropdown.placeholderColor },
    ]);

    const isNotSelectedStyles = StyleSheet.flatten([
      styles.isNotSelected,
      { backgroundColor: inActiveColor || theme.colors.bgColor },
    ]);

    return (
      <View>
        <View style={{ zIndex: 10 }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({ rotateIcon: !rotateIcon })}
          >
            <View
              style={[
                styles.containerInput,
                { backgroundColor: theme.Dropdown.backgroundColor },
                containerStyle,
              ]}
            >
              <View style={styles.infoViewStyles}>
                <Text numberOfLines={1} style={[{ fontSize: 16 }, textStyles]}>
                  {labelSelected}
                </Text>
              </View>
              <View
                style={[
                  rotateIcon && styles.rotateIcon,
                  { justifyContent: 'center' },
                ]}
              >
                {iconComponent || (
                  <Icon
                    name="chevron-down"
                    size={iconSize || 24}
                    color={iconColor || theme.Dropdown.iconColor}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {rotateIcon ? (
            <View
              style={[
                styles.containerDropdownStyles,
                { backgroundColor: theme.colors.bgColor },
                dropdownStyles,
              ]}
            >
              <ScrollView>
                {data.map((item: any) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={this.setValue(item.value)}
                  >
                    <View
                      style={
                        value === item.value
                          ? [
                            styles.isSelected,
                            activeColor
                              ? { backgroundColor: activeColor }
                              : {
                                backgroundColor: theme.Dropdown.activeColor,
                              },
                          ]
                          : isNotSelectedStyles
                      }
                    >
                      <Text
                        style={
                          value === item.value
                            ? activeTextColor
                              ? { color: activeTextColor }
                              : { color: theme.Dropdown.activeTextColor }
                            : {
                              color:
                                  inActiveTextColor || theme.Dropdown.textColor,
                            }
                        }
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
        {rotateIcon ? (
          <TouchableWithoutFeedback
            onPress={() => this.setState({ rotateIcon: !rotateIcon })}
          >
            <View
              style={{
                flex: 1,
                position: 'absolute',
                left: 0,
                top: 0,
                // opacity: 0.5,
                // backgroundColor: 'black',
                backgroundColor: 'transparent',
                width,
                height,
                justifyContent: 'center',
              }}
            >
              {/* <ActivityIndicator /> */}
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    );
  }
}
// export default Dropdown;
export default withTheme(
  (Dropdown as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);
