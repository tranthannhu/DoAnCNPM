import React, { Component } from 'react';
import {
  View, Dimensions, StyleSheet,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './Component/SliderEntry';

const { width: viewportWidth } = Dimensions.get('window');

interface Props {
  data: any,
  type?: string,
  sliderWidth?: number,
  itemWidth?: number,
  sliderHeight?: number,
  PaginationStyleProps?: any,
  dotStyleProps?: any,
  hide?: boolean,
  theme?: any,
  layout?: any,
}
interface State {
  activeSlide: number,
}
class MyCarousel extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderItem = ({ item }: {item: any, index: any}) => {
    const {
      itemWidth,
      sliderWidth,
      sliderHeight,
      type,
    } = this.props;
    return (
      <SliderEntry
        data={item}
        itemWidth={itemWidth}
        sliderWidth={sliderWidth}
        sliderHeight={sliderHeight}
        type={type}
      />
    );
  };

  render() {
    const {
      data, PaginationStyleProps, dotStyleProps, hide, sliderWidth, theme, layout,
    } = this.props;
    const { activeSlide } = this.state;
    const containerStyle = StyleSheet.flatten([
      {
        flexDirection: 'row',
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
      },
      PaginationStyleProps,
    ]);
    const dotstyle = StyleSheet.flatten([
      {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.AppModal.backgroundColor,
      },
      dotStyleProps,
    ]);
    return (
      <View>
        <Carousel
          layout={layout || 'default'}
          data={data}
          renderItem={this.renderItem}
          itemWidth={sliderWidth || viewportWidth}
          sliderWidth={sliderWidth || viewportWidth}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {
          !hide ? (
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              containerStyle={containerStyle}
              dotStyle={dotstyle}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
              inactiveDotStyle={{
                backgroundColor: '#C4C4C4',
              }}
            />
          ) : false
        }
      </View>
    );
  }
}
export default withTheme(MyCarousel as unknown as React.ComponentType<Props & ThemeProps<any>>);
