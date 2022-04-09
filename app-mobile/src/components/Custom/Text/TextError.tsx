import React, { PureComponent } from 'react';
import { TError } from '@utils/redux';
import _ from 'lodash';
import Text, { TextProps } from '../../Common/Text';
import QuickView from '../../Common/View/QuickView';

export interface TextErrorProps extends Omit<TextProps, 'error'> {
  error: null | TError;
}
class TextError extends PureComponent<TextErrorProps> {
  renderMessage = () => {
    const { error, ...otherProps } = this.props;
    if (error) {
      return error?.messages.map((message, index) => (
        <Text
          key={index.toString()}
          {...otherProps}
          marginVertical={2}
          center
          error
        >
          {message}
        </Text>
      ));
    }
    return null;
  };

  render() {
    const { error } = this.props;
    if (error && !_.isUndefined(_.head(error.messages))) {
      return <QuickView marginVertical={2}>{this.renderMessage()}</QuickView>;
    }
    return null;
  }
}

export default TextError;
