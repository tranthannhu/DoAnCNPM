import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { QuickView } from '@components';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { applyObjectSelector } from '@utils/selector';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import { loginSelector } from '../redux/selector';

interface Props extends AuthButtonProps {
  requireLogin?: boolean;
  loginSelectorData: any;
}
class LoginButton extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    const { requireLogin, loginSelectorData, ...otherProps } = this.props;
    if (!requireLogin && !loginSelectorData.data.get('token')) {
      return (
        <QuickView>
          <AuthButton
            t="auth:login"
            {...otherProps}
            onPress={() => NavigationService.navigate(rootStack.authStack)}
          />
        </QuickView>
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  LoginButton,
);
