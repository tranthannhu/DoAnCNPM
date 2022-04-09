import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import { TObjectRedux } from '@utils/redux';
import { Color } from '@themes/Theme';
import { withTheme, Icon } from 'react-native-elements';
import { QuickView, TextError, AuthButton, Text } from '@components';
import AuthInput from '@contents/Auth/containers/Index/Shared/AuthInput';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import authStack from '@contents/Auth/containers/routes';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { IRegisterInput } from '../redux/model';
import { applyObjectSelector } from '@utils/selector';
import { registerSelector } from '../redux/selector';
import { register } from '../redux/slice';
interface Props {
  registerData: TObjectRedux;
  registerRedux: (data: IRegisterInput) => any;
  theme?: any;
}
interface State {
  check: boolean;
  err: object;
}
class RegisterForm extends PureComponent<Props, State> {
  private email: any;

  private password: any;

  private name: any;

  private confirmPassword: any;

  constructor(props: any) {
    super(props);
    this.state = {
      check: false,
      err: {
        code: 400,
        message: ['Please fill all the inforamtion'],
      },
    };
  }

  validateForm = () => {
    console.log('email', this.email.getText());

    // if (this.email.getText() === '') {
    //   console.log();
    // };
    // if(this.name.getText() === '') {

    // }
    // if(this.password.getText() === '') {

    // }
    // if(this.confirmPassword.getText() === '') {

    // }
  };

  componentDidMount() { }

  render() {
    const { registerData, registerRedux } = this.props;
    const { check, err } = this.state;
    return (
      <>
        <TextError error={registerData?.error}
        // color="#FA8072" 
        />
        <AuthInput
          ref={(ref: any) => {
            this.email = ref;
          }}
          leftIcon={{
            name: 'email-outline',
            // color: '#ffffff' 
          }}
          placeholder="Email"
          fontSize={10}
          validationField="email"
          // color="#ffffff"
          borderBottomColor="red"
          borderWidth={2}
          keyboardType="email-address"
        // backgroundColor="#343434"
        />
        <AuthInput
          ref={(ref: any) => {
            this.name = ref;
          }}
          leftIcon={{
            name: 'user',
            // color: '#ffffff', 
            type: 'antdesign'
          }}
          placeholder="Name"
          // color="#ffffff"
          marginTop={10}
          keyboardType="email-address"
        // backgroundColor="#343434"
        />
        <AuthInput
          ref={(ref: any) => {
            this.password = ref;
          }}
          leftIcon={{
            name: 'lock-outline',
            // color: '#ffffff' 
          }}
          textContentType="oneTimeCode"
          placeholder="Password"
          // color="#ffffff"
          // rightIconColor="#28D8A1"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
          secureTextEntry
          marginTop={10}
        // backgroundColor="#343434"
        />
        <AuthInput
          ref={(ref: any) => {
            this.confirmPassword = ref;
          }}
          leftIcon={{
            name: 'lock-outline',
            // color: '#ffffff' 
          }}
          textContentType="oneTimeCode"
          placeholder="Confirm Password"
          // color="#ffffff"
          // rightIconColor="#28D8A1"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
          secureTextEntry
          marginVertical={10}
        // backgroundColor="#343434"
        />

        <QuickView row justifyContent="space-between">
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ check: !check });
            }}
          >
            <QuickView row alignItems="center">
              {check ? (
                <Icon
                  name="downcircleo"
                  type="antdesign"
                  // color="#28D8A1"
                  size={16}
                />
              ) : (
                <Icon name="circle" type="entypo"
                  // color="#28D8A1" 
                  size={16} />
              )}
              <Text marginLeft={5}
                // color="#bbbbbb"
                t="auth:terms" />
            </QuickView>
          </TouchableWithoutFeedback>
        </QuickView>
        <QuickView marginTop={30}>
          <AuthButton
            t="auth:register"
            // onPress={this.onSignIn}
            // color={Color.white}
            // backgroundColor="#28d8a1"
            shadow
            onPress={() => {
              registerRedux({
                email: this.email?.getText(),
                password: this.password?.getText(),
                confirmPassword: this.confirmPassword?.getText(),
                name: this.name?.getText(),
              });
              if (registerData.error === null) {
                NavigationService.navigate(authStack.greetingScreen);
              }
            }}
          />
        </QuickView>
        <QuickView row center>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate(rootStack.authStack, {
                screen: authStack.jobSeekerRegisterScreen,
              });
            }}
          >
            <Text t="auth:forgot"
              // color="#28D8A1" 
              marginLeft={5} />
          </TouchableOpacity>
        </QuickView>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  registerData: applyObjectSelector(registerSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerRedux: (data: IRegisterInput) => dispatch(register({ data })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(RegisterForm as any));
