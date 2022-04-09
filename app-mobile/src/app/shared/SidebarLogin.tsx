import { Avatar, QuickView, Text } from '@components';
import { loginSelector } from '@contents/Auth/containers/Index/Login/redux/selector';
import { logout } from '@contents/Auth/containers/Index/Login/redux/slice';
import { themeSelector } from '@contents/Config/redux/selector';
import CVScreen from '@contents/Main/containers/Profile/containers/screens/CVScreen';
import rootStack from '@contents/routes';
import NavigationService from '@utils/navigation';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import React, { PureComponent } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Overlay } from 'react-native-elements';

import { ModalButton, ModalFooter } from 'react-native-modals';
import { connect } from 'react-redux';

interface Props {
  reduxLogout: () => any;
  loginSelectorData?: any;
}
interface State {
  isVisibleBackdrop: boolean;
}

class SidebarLoginScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisibleBackdrop: false,
    };
  }

  modalFooterComponent = () => {
    const { reduxLogout } = this.props;
    return (
      <ModalFooter>
        <ModalButton
          text="Cancel"
          onPress={() => {
            this.setState({ isVisibleBackdrop: false });
            
          }}
        />
        <ModalButton
          text="Yes"
          onPress={() => {
            reduxLogout();
            this.setState({ isVisibleBackdrop: false });
          }}
        />
      </ModalFooter>
    );
  };

  render() {
    const { loginSelectorData, reduxLogout } = this.props;
    const toggleOverlay = () => {
      this.setState({ isVisibleBackdrop: !isVisibleBackdrop });
    };
    const { isVisibleBackdrop } = this.state;
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <QuickView>
        <QuickView alignItems="center" marginTop={-48}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                loginSelectorData.data.profile?.profileUrl
                || 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            title="A1"
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
            <Text center color="#241f1f">
              {loginSelectorData.data?.profile?.name}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                NavigationService.navigate(rootStack.profileStack, {
                  screen: CVScreen,
                });
              }}
            >
              <Text center marginTop={5} color="#4771b5">
                Edit Profile
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
              <Text color="#241f1f">LANGUAGE</Text>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isVisibleBackdrop: true });
              }}
            >
              <Text color="#241f1f" marginTop={20} fontSize={16}>
                LOGOUT
              </Text>
            </TouchableOpacity>
            <Overlay
              isVisible={isVisibleBackdrop}
              onBackdropPress={toggleOverlay}
              overlayStyle={{
                borderRadius: 10,
                backgroundColor: '#fff',
                width: screenWidth - 60,
                padding: 0,
              }}
            >
              <QuickView height={150}>
                <QuickView flex={1} center>
                  <Text color="#e32d14" fontSize={22} fontWeight="bold">
                    Warning
                  </Text>
                </QuickView>
                <QuickView center flex={1}>
                  <Text color="#8a8786" style={{ opacity: 0.7 }}>
                    Do you want logout
                  </Text>
                </QuickView>
                <QuickView style={{ borderWidth: 0 }} row>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#f58240',
                      borderRightColor: '#fff',
                      flex: 1,
                      padding: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      reduxLogout();
                    }}
                  >
                    <Text center color="#fff" bold>
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#f58240',
                      flex: 1,
                      borderLeftWidth: 1,
                      borderLeftColor: '#fff',
                      padding: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text center color="#fff" bold>
                      No
                    </Text>
                  </TouchableOpacity>
                </QuickView>
              </QuickView>
            </Overlay>
          </QuickView>
        </QuickView>
      </QuickView>
    );
  }
}
const mapStateToProps = (state: any) => ({
  themeRedux: themeSelector(state),
  loginSelectorData: parseObjectSelector(
    applyObjectSelector(loginSelector, state),
  ),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarLoginScreen as any);
