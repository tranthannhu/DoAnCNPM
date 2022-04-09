import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Avatar, QuickView, Text } from '@components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';

export class SidebarRegister extends PureComponent {
  render() {
    return (
      <QuickView>
        <QuickView alignItems="center" marginTop={-48}>
          <Avatar
            rounded
            containerStyle={{ borderColor: '#bdb7b5', borderWidth: 1 }}
            size="large"
            icon={{ name: 'user', type: 'entypo', color: '#b5afac' }}
            backgroundColor="#fff"
          />
        </QuickView>
        <QuickView>
          <QuickView
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cfcccc',
            }}
            paddingTop={20}
            paddingBottom={50}
          >
            <Text center color="#241f1f" fontSize={20}>
              Apply for jobs now !
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                NavigationService.navigate(rootStack.authStack);
              }}
            >
              <Text center marginTop={5} color="#4771b5">
                Login or Register
              </Text>
            </TouchableWithoutFeedback>
          </QuickView>
          <QuickView
            paddingHorizontal={20}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cfcccc',
            }}
            paddingTop={20}
            paddingBottom={50}
          >
            <TouchableWithoutFeedback>
              <Text color="#241f1f">WHO VIEW MY PROFILE</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                JOB ALERTS
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                NOTIFICATIONS
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                SHARE YOUR PROFILE
              </Text>
            </TouchableWithoutFeedback>
          </QuickView>

          <QuickView
            paddingHorizontal={20}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#cfcccc',
            }}
            paddingTop={20}
            paddingBottom={50}
          >
            <TouchableWithoutFeedback>
              <Text color="#241f1f">TERMS AND CONDITIONS</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                PRIVACY POLICY
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                CONTACT US
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Text color="#241f1f" marginTop={20}>
                FEEDBACK
              </Text>
            </TouchableWithoutFeedback>
          </QuickView>
        </QuickView>
      </QuickView>
    );
  }
}

// const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(SidebarRegister as any);
