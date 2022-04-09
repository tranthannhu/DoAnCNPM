import React, { PureComponent } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Platform, Dimensions,
} from 'react-native';
import { withTheme, ThemeProps } from 'react-native-elements';
import { VideoComponent } from '../../Video';
// import Video from 'react-native-video';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(95);
const itemHorizontalMargin = wp(2);

// export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;
interface Props {
  data: any,
  even?: boolean,
  itemWidth?: number,
  sliderWidth?: number,
  sliderHeight?: number,
  type?: string,
  theme?: any,
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMaskEven: {
    backgroundColor: '#000000',
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

class SliderEntry extends PureComponent<Props> {
  private player : any;

  render() {
    const {
      data, sliderHeight, sliderWidth, type, theme,
    } = this.props;
    const containerStyle = StyleSheet.flatten([
      styles.slideInnerContainer,
      {
        width: sliderWidth || itemWidth,
        height: sliderHeight || slideHeight,
      },
    ]);
    return (
      type !== 'video' ? (
        <TouchableOpacity
          activeOpacity={1}
          style={containerStyle}
        >
          <View style={[styles.imageContainer,
            { backgroundColor: theme.AppModal.backgroundColor }]}
          >
            <Image
              source={{ uri: data.illustration }}
              style={styles.image}
            />
          </View>
          {type !== 'image' ? (
            <View style={[styles.textContainer,
              { backgroundColor: theme.AppModal.backgroundColor }]}
            >
              { data.title ? (
                <Text
                  style={[styles.title, { color: theme.AppModal.textColor }]}
                  numberOfLines={2}
                >
                  { data.title.toUpperCase() }
                </Text>
              ) : false }
              <Text
                style={[styles.subtitle, { color: theme.AppModal.textColor }]}
                numberOfLines={2}
              >
                { data.subtitle }
              </Text>
            </View>
          ) : (
            false
          )}
        </TouchableOpacity>
      )
        : (
          <VideoComponent />
        )
    );
  }
}
export default withTheme(SliderEntry as unknown as React.ComponentType<Props & ThemeProps<any>>);
