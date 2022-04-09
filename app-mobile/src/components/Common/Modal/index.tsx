import React, { PureComponent } from 'react';
import {
  BackdropCloseModal,
  BottomHalfModal,
  CustomBackdropModal,
  DefaultModal,
  FancyModal,
  SlideModal,
  SwipeableModal,
} from '@components/Common/Modal/ModalContainer';
import { withTheme, ThemeProps } from 'react-native-elements';
import QuickView from '../View/QuickView';

// @ts-ignore

export type ModalType =
  | 'backdrop'
  | 'bottomhalf'
  | 'customback'
  | 'default'
  | 'fancy'
  | 'slide'
  | 'swipeable'
  | string;

interface Props {
  title?: string;
  content?: string;
  type: ModalType;
  viewComponent?: any;
  isVisibleProps?: boolean;
  backgroundColor?: string;
  textColor?: string;
  theme?: any;
  onClick: any;
  height?: any;
  scroll?: boolean;
}
interface State {
  visible: boolean;
}

class AppModal extends PureComponent<Props, State> {
  onClickClose = async () => {
    const { onClick } = this.props;
    await onClick();
  };

  checkType = () => {
    const {
      viewComponent,
      isVisibleProps,
      type,
      backgroundColor,
      textColor,
      title,
      content,
      theme,
      height,
      scroll,
    } = this.props;
    if (type === 'bottomhalf') {
      return (
        <BottomHalfModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
          height={height}
          scroll={scroll}
        />
      );
    }
    if (type === 'backdrop') {
      return (
        <BackdropCloseModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={backgroundColor || theme.AppModal.backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      );
    }
    if (type === 'customback') {
      return (
        <CustomBackdropModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      );
    }
    if (type === 'fancy') {
      return (
        <FancyModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      );
    }
    if (type === 'slide') {
      return (
        <SlideModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      );
    }
    if (type === 'swipeable') {
      return (
        <SwipeableModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      );
    }
    return (
      <QuickView>
        <DefaultModal
          viewComponent={viewComponent}
          isVisibleProps={isVisibleProps}
          title={title}
          content={content}
          backgroundColor={theme.AppModal.backgroundColor || backgroundColor}
          textColor={theme.AppModal.textColor || textColor}
          onClickClose={this.onClickClose}
        />
      </QuickView>
    );
  };

  render() {
    return this.checkType();
  }
}
export default withTheme(
  (AppModal as unknown) as React.ComponentType<Props & ThemeProps<any>>,
);
