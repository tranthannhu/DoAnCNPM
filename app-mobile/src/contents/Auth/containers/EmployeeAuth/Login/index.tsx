import React, { PureComponent } from 'react';
import { QuickView, Container, Text, Image, Header } from '@components';
import EmployeeLoginForm from './Shared/EmployeeLoginForm';
import LoginBackIcon from '../../Index/Login/Shared/LoginBackIcon';
import { StatusBar } from 'react-native';

class EmployeeLoginScreen extends PureComponent {
  render() {
    return (
      <Container>
        <StatusBar backgroundColor="transparent" />
        <QuickView paddingHorizontal={20}
          // backgroundColor="#0E0E0E" 
          flex={1}>
          <LoginBackIcon color="#000" zIndex={999} />
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

          {/* <QuickView marginBottom={20} marginTop={30} center>
            <Text
              fontSize={30}
              color="#000"
              fontWeight="bold"
              style={{
                // letterSpacing: '1px',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontFamily: 'Avenir',
              }}
            >
              IT
              <Text
                fontSize={30}
                // color="#28D8A1"
                fontWeight="bold"
                style={{
                  // letterSpacing: '1px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontFamily: 'Avenir',
                }}
              >
                JOB
              </Text>
            </Text>
          </QuickView> */}
          {/* <QuickView row alignItems="center" marginTop={10}>
            <Text fontSize={18} color="#fff" fontFamily="RobotoBold">IT</Text>
            <QuickView backgroundColor="#fff" borderRadius={20} height={38} width={38}>
              <Image
                source={{ uri: 'https://pics.freeicons.io/uploads/icons/png/7167593101582994867-512.png' }}
                style={{ width: 40, height: 40 }}
              />
            </QuickView>
          </QuickView> */}
          <EmployeeLoginForm />
        </QuickView>
      </Container>
    );
  }
}

export default EmployeeLoginScreen;
