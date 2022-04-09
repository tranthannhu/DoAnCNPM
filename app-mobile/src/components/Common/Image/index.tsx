import React, { PureComponent } from 'react';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {
  ActivityIndicator, Image as RNImage, StyleSheet, Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Color } from '@themes/Theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import { bodyPaddingHorizontal, roundedBorderRadius } from '@themes/ThemeComponent/Common/CommonProps';
import { Metrics } from '@themes';
import QuickView from '../View/QuickView';

export interface ImageProps extends Omit<FastImageProps, 'source'> {
  width: number;
  height?: number | string;
  source: Source;
  multipleSources?: any;
  viewEnable?: boolean;
  containerStyle?: any;
  loadingColor?: string;
  loadingSize?: number;
  showLoadingText?: boolean;
  loadingType?: 'default' | 'bar' | 'pie' | 'circle' | 'circleSnail';
  center?: boolean;
  sharp?: boolean;
  rounded?: boolean;
  circle?: boolean;
  borderRadius?: number;
  placeholderBorderColor?: string;
  placeholderBorderWidth?: number;
  disablePlaceholder?: boolean;
}
interface State {
  progress: number;
  indeterminate: boolean;
  loading: boolean;
  renderFail: boolean;
  imageWidth: number;
  imageHeight: number;
  viewModeOn: boolean;
}
const styles: any = {
  center: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  viewHeaderImages: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
};

class Image extends PureComponent<ImageProps, State> {
  static defaultProps = {
    width: Metrics.screenWidth - 2 * bodyPaddingHorizontal,
    resizeMode: 'cover',
    showLoadingText: true,
    loadingType: 'circle',
    rounded: true,
    placeholderBorderColor: Color.grey4,
    placeholderBorderWidth: 1,
  };

  constructor(props: ImageProps) {
    super(props);
    this.state = {
      progress: 0,
      indeterminate: true,
      loading: true,
      renderFail: false,
      imageWidth: 0,
      imageHeight: 0,
      viewModeOn: false,
    };
    this.getRemoteImageSize();
  }

  getRemoteImageSize = () => {
    const { source } = this.props;
    if (source) {
      if (source.uri) {
        // Remote Image
        RNImage.getSize(
          source.uri,
          (w, h) => {
            this.setState({
              imageWidth: w,
              imageHeight: h,
            });
          },
          () => {},
        );
      }
    }
  };

  renderLoadingPlaceholder = () => {
    const { loading } = this.state;
    const { width, disablePlaceholder } = this.props;
    if (loading && !disablePlaceholder) {
      return (
        <QuickView style={styles.center}>
          <Icon
            name="image"
            color="rgba(173, 181, 189, 0.7)"
            size={width / 2}
          />
        </QuickView>
      );
    }
    return null;
  };

  renderErrorPlaceholder = () => {
    const { renderFail } = this.state;
    const { width } = this.props;
    if (renderFail) {
      return (
        <QuickView style={styles.center}>
          <Icon
            name="image-off"
            type="material-community"
            color="rgba(173, 181, 189, 0.7)"
            size={width / 2}
          />
        </QuickView>
      );
    }
    return null;
  };

  renderProgress = () => {
    const { progress, indeterminate, loading } = this.state;
    const {
      loadingColor, loadingSize: loadingSizeProp, showLoadingText, width, loadingType,
    } = this.props;
    const loadingSize = loadingSizeProp || width / 5;
    if (loading) {
      switch (loadingType) {
        case 'circle':
          return (
            <Progress.Circle
              showsText={showLoadingText}
              progress={progress}
              indeterminate={indeterminate}
              style={styles.center}
              color={loadingColor}
              size={loadingSize}
            />
          );
        case 'bar':
          return (
            <Progress.Bar
              progress={progress}
              width={width}
              indeterminate={indeterminate}
              style={{
                top: 0,
                position: 'absolute',
                zIndex: 1,
              }}
              color={loadingColor}
            />
          );
        case 'pie':
          return (
            <Progress.Pie
              progress={progress}
              indeterminate={indeterminate}
              style={styles.center}
              color={loadingColor}
              size={loadingSize}
            />
          );
        case 'circleSnail':
          return (
            <Progress.CircleSnail
              progress={progress}
              indeterminate={indeterminate}
              style={styles.center}
              color={loadingColor}
              size={loadingSize}
            />
          );
        default:
          return (
            <QuickView style={styles.center}>
              <ActivityIndicator color={loadingColor} size={loadingSize >= 50 ? 'large' : 'small'} />
            </QuickView>
          );
      }
    }
    return null;
  };

  renderImageViewer = () => {
    const imageUrls = [];
    let index = 0;
    const { source: sourceProp, multipleSources, loadingColor } = this.props;
    let source = sourceProp;
    if (sourceProp.uri) { source = _.pick(sourceProp, 'uri'); }
    const { viewModeOn } = this.state;
    if (!multipleSources) {
      imageUrls.push({
        url: source.uri || '',
        props: {
          source,
        },
      });
    } else {
      multipleSources.map((item:any) => {
        imageUrls.push({
          url: item.uri || '',
          props: {
            item,
          },
        });
        return true;
      });
      index = _.findIndex(multipleSources, source);
    }
    return (
      <Modal visible={viewModeOn} transparent>
        <ImageViewer
          onCancel={() => this.setState({ viewModeOn: false })}
          loadingRender={() => <ActivityIndicator size="large" color={loadingColor} />}
          enableSwipeDown
          index={index}
          imageUrls={imageUrls}
          renderHeader={() => (
            <QuickView style={styles.viewHeaderImages}>
              <Icon
                name="close"
                type="antdesign"
                size={24}
                color="#FFFFFF"
                onPress={() => this.setState({ viewModeOn: false })}
              />
            </QuickView>
          )}
        />
      </Modal>
    );
  };

  render() {
    const {
      imageHeight, imageWidth, loading, renderFail,
    } = this.state;
    const {
      source,
      width: widthProp,
      height: heightProp,
      center,
      containerStyle: containerStyleProp,
      style: styleProp,
      loadingType,
      viewEnable,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      borderRadius: borderRadiusProp,
      placeholderBorderColor,
      placeholderBorderWidth,
      ...otherProps
    } = this.props;
    const ratio = imageHeight / imageWidth || 1;
    let width: any = widthProp;
    let height = heightProp || ratio * width;

    /**
     *  For Local Image
     */
    const localSource: any = source;
    const image: any = RNImage.resolveAssetSource(localSource);

    // eslint-disable-next-line no-underscore-dangle
    if (image.__packager_asset) {
      height = heightProp || (image.height / image.width) * width;
    }

    /**
     * containerStyle
     */
    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }
    const containerStyle: any = StyleSheet.flatten([
      {
        width,
        height,
        justifyContent: 'center',
        borderRadius,
      },
      (loading || renderFail) && {
        borderColor: placeholderBorderColor,
        borderWidth: placeholderBorderWidth,
      },
      center && { alignSelf: 'center' },
      containerStyleProp,
    ]);

    /**
     * style
     */
    const style: any = StyleSheet.flatten([
      {
        width,
        height,
        borderRadius,
      },
      styleProp,
    ]);

    return (
      <>
        <QuickView
          style={containerStyle}
          onPress={(viewEnable && !renderFail)
            ? () => this.setState({ viewModeOn: true })
            : undefined}
        >
          { this.renderLoadingPlaceholder() }
          { this.renderProgress() }
          { this.renderErrorPlaceholder() }
          <FastImage
            {...otherProps}
            style={style}
            source={source}
            onLoadStart={() => this.setState({
              indeterminate: false,
            })}
            onProgress={(e) => {
              const { loaded } = e.nativeEvent;
              const total = e.nativeEvent.total || 100000;
              const progressPercent = loaded / total;
              if (progressPercent > 0) {
                this.setState({
                  loading: true,
                  progress: progressPercent <= 1 ? progressPercent : 1,
                });
              }
            }}
            onLoadEnd={() => this.setState({ loading: false })}
            onError={() => { this.setState({ renderFail: true }); }}
          />
        </QuickView>
        {this.renderImageViewer()}
      </>
    );
  }
}

export default Image;
