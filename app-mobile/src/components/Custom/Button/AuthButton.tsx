import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import Button, { ButtonProps } from '../../Common/Button/DefaultButton';

export interface AuthButtonProps extends ButtonProps{
}

class AuthButton extends PureComponent<AuthButtonProps> {
  static defaultProps = {
    type: 'solid',
    height: 50,
    width: '100%',
    bold: true,
    titlePaddingHorizontal: 20,
  };

  render() {
    const {
      theme,
      ...otherProps
    } = this.props;

    return (
      <Button
        {...otherProps}
      />
    );
  }
}

export default withTheme(
  AuthButton as unknown as React.ComponentType<AuthButtonProps & ThemeProps<any>>,
);
