import React, { PureComponent } from 'react';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import authStack from '@contents/Auth/containers/routes';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';

interface Props extends AuthButtonProps {
}
class RegisterButton extends PureComponent<Props> {
  static defaultProps = {
  };

  render() {
    const {
      ...otherProps
    } = this.props;
    return (
      <AuthButton
        t="auth:register"
        {...otherProps}
        onPress={() => NavigationService.navigate(rootStack.authStack, {
          screen: authStack.registerStack,
        })}
      />
    );
  }
}

export default RegisterButton;
