/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image,
} from '@components';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { StatusBar } from 'react-native';
import authStack from '../routes';
import LoginBackIcon from './Login/Shared/LoginBackIcon';

class GreetingScreen extends PureComponent {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="transparent" />

        <Body
          fullView
          backgroundImage={{
            source: require('@assets/images/background.png'),
            resizeMode: 'stretch',
          }}
        >
          <LoginBackIcon color="#000" zIndex={999} />
          <QuickView
            height="100%"
            justifyContent="space-between"
            style={{ zIndex: -1 }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 30,
                marginTop: 50,
              }}
              onPress={() => NavigationService.navigate(rootStack.authStack, {
                screen: authStack.employeeLoginScreen,
              })}
            >
              <Image
                source={require('@assets/images/loginAsEmployer.png')}
                width={250}
              />
              <Text color="#4E92DF" center style={{ width: 220 }}>
                Login as Employee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 50,
                alignSelf: 'flex-end',
              }}
              onPress={() => NavigationService.navigate(rootStack.authStack, {
                screen: authStack.jobSeekerRegisterScreen,
              })}
            >
              <Text
                color="#FFFFFF"
                center
                style={{ width: 250, marginLeft: 30 }}
              >
                Register as Employee
              </Text>
              <Image
                source={require('@assets/images/loginAsEmployee.png')}
                width={250}
                containerStyle={{ marginRight: 30 }}
              />
            </TouchableOpacity>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GreetingScreen);
