import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import NavigationService from '@utils/navigation';
import ButtonGroup, { ButtonGroupProps } from '../../Common/Button/ButtonGroup';
import Text from '../../Common/Text';

export interface NavigatorButtonGroupProps extends ButtonGroupProps {
  state: any;
  position: any;
}

class NavigatorButtonGroup extends React.PureComponent<NavigatorButtonGroupProps> {
  onPress = (index: number) => {
    const { state } = this.props;
    const isFocused = state.index === index;
    if (!isFocused) {
      NavigationService.navigate(state.routes[index].name);
    }
  };

  renderItem = ({ item, index }: { item: string; index: number }) => {
    const { state, position } = this.props;
    const inputRange = state.routes.map((_: any, i: number) => i);
    const outputRange = inputRange.map((i: number) => (i === index ? 1 : 0));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const opacity = Animated.interpolate(position, {
      inputRange,
      outputRange,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const color = Animated.color(
      Animated.round(
        Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((inputIndex: any) => (inputIndex === index ? 255 : 0)),
        }),
      ),
      0,
      0,
    );
    const backgroundColor = Animated.color(
      Animated.round(
        Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((inputIndex: any) => (inputIndex === index ? 1 : 230)),
        }),
      ),
      Animated.round(
        Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((inputIndex: any) => (inputIndex === index ? 32 : 233)),
        }),
      ),
      Animated.round(
        Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((inputIndex: any) => (inputIndex === index ? 102 : 240)),
        }),
      ),
    );
    return (
      <Animated.View style={{ backgroundColor }}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            const isFocused = state.index === index;
            if (!isFocused) {
              NavigationService.navigate(state.routes[index].name);
            }
          }}
        >
          <Text color="#FFFFFF">{item}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const { state, position, ...otherProps } = this.props;
    return (
      <ButtonGroup
        {...otherProps}
        defaultActiveIndex={state.index}
        flatListProps={{ renderItem: this.renderItem }}
      />
    );
  }
}

export default NavigatorButtonGroup;
