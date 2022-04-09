import React, { PureComponent } from 'react';
import { QuickView, Container, Text, Image } from '@components';
import RegisterBackIcon from './Shared/RegisterBackIcon';
import RegisterForm from './Shared/RegisterForm';
import { ScrollView } from 'react-native-gesture-handler';
import LoginBackIcon from '../../Index/Login/Shared/LoginBackIcon';
import { StatusBar } from 'react-native';

class RegisterScreen extends PureComponent {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="transparent" />
        <QuickView paddingHorizontal={20}
          // backgroundColor="#0E0E0E" 
          flex={1}>
          <LoginBackIcon color="#000" zIndex={999} />
          {/* <ScrollView> */}
          {/* <RegisterBackIcon /> */}

          <QuickView row alignItems="flex-end" marginTop={30} justifyContent="center" paddingVertical={30}>
            <Text fontSize={100}
              // color="#000" 
              fontFamily="RobotoBold">IT</Text>
            <Image
              // source={require('@assets/images/illustration.png')}
              source={require('@assets/images/logoJob.png')}
              width={200}
            // tintColor='blue'
            />
          </QuickView>
          {/* <QuickView marginBottom={20} marginTop={130} center>
              <Text
                fontSize={30}
                color="#ffffffff"
                fontWeight="bold"
                style={{
                  // letterSpacing: '1px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontFamily: 'Avenir',
                }}
              >
                FACI
                <Text
                  fontSize={30}
                  color="#28D8A1"
                  fontWeight="bold"
                  style={{
                    // letterSpacing: '1px',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFamily: 'Avenir',
                  }}
                >
                  O
                </Text>
              </Text>
            </QuickView> */}
          <RegisterForm />
          {/* </ScrollView> */}
        </QuickView>
      </Container>
    );
  }
}

export default RegisterScreen;
