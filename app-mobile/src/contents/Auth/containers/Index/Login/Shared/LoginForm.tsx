import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { applyObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { Color } from '@themes/Theme';
import { withTheme } from 'react-native-elements';
import { QuickView, TextError } from '@components';
import AuthButton from '../../Shared/AuthButton';
import AuthInput from '../../Shared/AuthInput';
import { ILogInInput } from '../redux/model';
import { login, logout } from '../redux/slice';
import { loginSelector } from '../redux/selector';

interface Props {
  loginData: TObjectRedux;
  reduxLogin: (data: ILogInInput) => any;
  theme?: any;
}
class LoginForm extends PureComponent<Props> {
  private email: any;

  private password: any;

  render() {
    const { loginData, reduxLogin, theme } = this.props;
    return (
      <>
        <TextError error={loginData.error} color="#FA8072" />
        <AuthInput
          ref={(ref: any) => {
            this.email = ref;
          }}
          value="ngotruongquoc0102@gmail.com"
          leftIconName="email-outline"
          placeholder="Email"
          validationField="email"
          keyboardType="email-address"
        />
        <AuthInput
          ref={(ref: any) => {
            this.password = ref;
          }}
          value="admin"
          leftIconName="lock-outline"
          textContentType="oneTimeCode"
          placeholder="Password"
          validationField="password"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
          secureTextEntry
          marginVertical={10}
        />
        {/* <AuthButton
          title="Log data"
              // onPress={this.onSignIn}
          onPress={() => {
            console.log('loginData: ', loginData);
            console.log('loginData loading: ', loginData.loading);
            console.log('loginData data: ', loginData.data.toJS());
            console.log('loginData error: ', loginData.error);
          }}
        /> */}
        <QuickView marginTop={20}>
          <AuthButton
            t="auth:login"
              // onPress={this.onSignIn}
            color={Color.white}
            outline
            onPress={() => {
              reduxLogin({ email: this.email.getText(), password: this.password.getText() });
            }}
            loading={loginData.loading}
          />
          <AuthButton
            t="auth:register"
            titleColor={theme.colors.primary}
            backgroundColor={Color.white}
            onPress={() => {}}
          />
        </QuickView>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginData: applyObjectSelector(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogin: (data: ILogInInput) => dispatch(login({ data })),
  reduxLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(LoginForm as any));
