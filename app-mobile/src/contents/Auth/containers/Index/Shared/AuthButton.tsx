import React, { PureComponent } from 'react';
import { Button } from '@components';
import { ButtonProps } from '@components/Common/Button/DefaultButton';
import { withTheme, ThemeProps } from 'react-native-elements';

export interface AuthButtonProps extends ButtonProps {}

class AuthButton extends PureComponent<AuthButtonProps> {
  static defaultProps = {
    type: 'solid',
    height: 50,
    width: '100%',
    bold: true,
  };

  render() {
    const { theme, ...otherProps } = this.props;

    return <Button {...otherProps} />;
  }
}

export default withTheme(
  (AuthButton as unknown) as React.ComponentType<
  AuthButtonProps & ThemeProps<any>
  >,
);
