import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { QuickView } from '@components';
import { applyObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import { logout } from '../redux/slice';
import { loginSelector } from '../redux/selector';

interface Props extends AuthButtonProps {
  reduxLogout?: () => any;
  requireLogin?: boolean;
  loginSelectorData: TObjectRedux;
}
class LoginButton extends PureComponent<Props> {
  static defaultProps = {};

  render() {
    const {
      reduxLogout,
      requireLogin,
      loginSelectorData: { data },
      ...otherProps
    } = this.props;
    const token = data.get('token');
    if (token) {
      return (
        <AuthButton {...otherProps} t="auth:logout" onPress={reduxLogout} />
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
