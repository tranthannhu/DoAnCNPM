import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';

import { withTheme, ThemeProps } from 'react-native-elements';
import { roundedBorderRadius } from '@themes/ThemeComponent/Common/CommonProps';
import { Source } from 'react-native-fast-image';
import NavigationService from '@utils/navigation';
import SaveIcon from '@contents/Main/containers/Explore/containers/Shared/SaveIcon';
import QuickView from '../../View/QuickView';
import Header from '../../Header';
import Image from '../../Image';

const BaseParallaxScrollView = require('react-native-parallax-scroll-view');

interface ParallaxScrollViewProps {
  headerBackgroundColor?: string;
  contentBackgroundColor?: string;
  imageBackgroundColor?: string;
  parallaxHeaderHeight?: number;
  stickyHeaderHeight?: number;
  backgroundScrollSpeed?: number;
  fadeOutForeground?: boolean;
  onChangeHeaderVisibility?: (...params: any) => any;
  renderBackground?: () => any;
  renderContentBackground?: (...params: any) => any;
  renderFixedHeader?: (...params: any) => any;
  renderForeground?: (...params: any) => any;
  renderScrollComponent?: (...params: any) => any;
  renderStickyHeader?: (...params: any) => any;
  contentContainerStyle?: any;
  outputScaleValue?: number;
  scrollEvent?: (...params: any) => any;
  backgroundImageSource?: Source;
  children?: any;
  theme?: any;
  refreshControl?: any;
}
class ParallaxScrollView extends PureComponent<ParallaxScrollViewProps> {
  static defaultProps = {
    backgroundScrollSpeed: 5,
    fadeOutForeground: true,
    outputScaleValue: 5,
  };

  renderBackground = () => {
    const {
      imageBackgroundColor: imageBackgroundColorProp,
      contentBackgroundColor: contentBackgroundColorProp,
      parallaxHeaderHeight: parallaxHeaderHeightProp,
      backgroundImageSource,
      theme: { ParallaxScrollView: theme },
    } = this.props;

    const contentBackgroundColor = contentBackgroundColorProp || theme.contentBackgroundColor;
    const parallaxHeaderHeight = parallaxHeaderHeightProp || theme.parallaxHeaderHeight;
    const imageBackgroundColor = imageBackgroundColorProp || theme.imageBackgroundColor;
    const windowWidth = Dimensions.get('window').width;

    const imageSource = backgroundImageSource || {
      uri: 'https://picsum.photos/1500/1500',
      cache: 'web',
    };
    return (
      <QuickView backgroundColor={contentBackgroundColor}>
        <Image
          source={imageSource}
          width={windowWidth}
          height={parallaxHeaderHeight}
          placeholderBorderWidth={0}
          loadingType="default"
          disablePlaceholder
        />
        <QuickView
          position="absolute"
          top={0}
          width={windowWidth}
          height={parallaxHeaderHeight}
          backgroundColor={imageBackgroundColor}
          borderRadius={roundedBorderRadius}
        />
      </QuickView>
    );
  };

  renderForeground = () => <QuickView />;

  renderStickyHeader = () => <QuickView />;

  renderFixedHeader = () => {
    const leftComponent: any = {
      icon: 'arrowleft',
      type: 'antdesign',
      size: 25,
      color: '#FFF',
      onPress: () => NavigationService.goBack(),
      style: {
        width: 25, height: 25,
      },
      containerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 8,
        borderRadius: 20,
      },
    };
    return (
      <Header
        // leftComponent={leftComponent}
        // rightComponent={<SaveIcon />}
        transparent
        position="absolute"
        // top={-1}
        backIcon
        // switchTheme
      />
    );
  };

  render() {
    const {
      headerBackgroundColor: headerBackgroundColorProp,
      contentBackgroundColor: contentBackgroundColorProp,
      imageBackgroundColor: imageBackgroundColorProp,
      parallaxHeaderHeight: parallaxHeaderHeightProp,
      stickyHeaderHeight: stickyHeaderHeightProp,
      renderBackground,
      renderForeground,
      renderStickyHeader,
      renderFixedHeader,
      theme: { ParallaxScrollView: theme },
      children,
      ...otherProps
    } = this.props;

    /**
     * Color & Dimensions
     */
    const headerBackgroundColor = headerBackgroundColorProp || theme.headerBackgroundColor;
    const contentBackgroundColor = contentBackgroundColorProp || theme.contentBackgroundColor;
    const parallaxHeaderHeight = parallaxHeaderHeightProp || theme.parallaxHeaderHeight;
    const stickyHeaderHeight = stickyHeaderHeightProp || theme.stickyHeaderHeight;

    return (
      <BaseParallaxScrollView
        {...otherProps}
        backgroundColor={headerBackgroundColor}
        contentBackgroundColor={contentBackgroundColor}
        parallaxHeaderHeight={parallaxHeaderHeight}
        stickyHeaderHeight={stickyHeaderHeight}
        renderBackground={renderBackground || this.renderBackground}
        renderForeground={renderForeground || this.renderForeground}
        renderStickyHeader={renderStickyHeader || this.renderStickyHeader}
        renderFixedHeader={renderFixedHeader || this.renderFixedHeader}
      >
        {children}
      </BaseParallaxScrollView>
    );
  }
}

export default withTheme(
  ParallaxScrollView as unknown as React.ComponentType<ParallaxScrollViewProps & ThemeProps<any>>,
);
